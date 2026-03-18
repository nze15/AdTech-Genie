import { useState, useRef, useCallback } from 'react'
import { Upload, Wand2, Download, ImagePlus, X, Loader2, Sparkles, RefreshCw } from 'lucide-react'
import { cn } from '../lib/utils'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const EDIT_PROMPTS = [
  'Make the background transparent',
  'Enhance colors and make it more vibrant',
  'Convert to professional headshot style',
  'Add cinematic lighting and depth',
  'Make it look like a watercolor painting',
  'Remove the background and replace with a studio backdrop',
]

interface GeneratedImage {
  url: string
  prompt: string
  timestamp: Date
}

export default function ImagePage() {
  const { user, isLoading } = useAuth()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<GeneratedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP, etc.)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB')
      return
    }
    setUploadedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setUploadedUrl(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const uploadImage = async (): Promise<string | null> => {
    if (!uploadedFile) return null
    if (uploadedUrl) return uploadedUrl
    setIsUploading(true)
    try {
      const ext = uploadedFile.name.split('.').pop() ?? 'jpg'
      const { publicUrl } = await blink.storage.upload(
        uploadedFile,
        `image-ai/${Date.now()}.${ext}`
      )
      setUploadedUrl(publicUrl)
      return publicUrl
    } catch {
      toast.error('Failed to upload image. Please try again.')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const generate = async (promptText?: string) => {
    const finalPrompt = (promptText ?? prompt).trim()
    if (!finalPrompt) {
      toast.error('Please enter a prompt describing the edit')
      return
    }

    if (!user && !isLoading) {
      blink.auth.login()
      return
    }

    setIsGenerating(true)
    try {
      let imageUrl = uploadedUrl

      // If no uploaded URL yet but have file, upload first
      if (uploadedFile && !imageUrl) {
        imageUrl = await uploadImage()
        if (!imageUrl) return
      }

      if (imageUrl) {
        // Edit existing image
        const { data } = await blink.ai.modifyImage({
          prompt: finalPrompt,
          images: [imageUrl],
        })
        const result = data?.[0]
        if (result?.url) {
          setResults(prev => [{ url: result.url as string, prompt: finalPrompt, timestamp: new Date() }, ...prev])
          toast.success('Image edited successfully!')
        }
      } else {
        // Generate from prompt only
        const { data } = await blink.ai.generateImage({
          prompt: finalPrompt,
          size: '1024x1024',
        })
        const result = data?.[0]
        if (result?.url) {
          setResults(prev => [{ url: result.url as string, prompt: finalPrompt, timestamp: new Date() }, ...prev])
          toast.success('Image generated successfully!')
        }
      }
    } catch (err: unknown) {
      const error = err as Error
      const isAuthError = error?.message?.includes('401') || error?.message?.includes('Unauthorized')
      if (isAuthError) {
        blink.auth.login()
        return
      }
      toast.error('Failed to process image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `adtech-genie-${index + 1}.png`
    a.target = '_blank'
    a.click()
  }

  const clearImage = () => {
    setUploadedFile(null)
    setUploadedUrl(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }

  return (
    <div className="h-full overflow-y-auto pb-20 lg:pb-6">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-6">

        {/* Upload zone */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Source Image (Optional)</h3>
            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 hover:bg-background backdrop-blur-sm flex items-center justify-center text-foreground transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs text-foreground">
                  {uploadedFile?.name}
                </div>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all',
                  isDragging
                    ? 'border-primary bg-primary/10 scale-[1.01]'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                )}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Drop image here</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse · PNG, JPG, WebP · Max 10MB</p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* Prompt + quick actions */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {previewUrl ? 'Edit Instruction' : 'Generate Prompt'}
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={previewUrl
                  ? 'Describe how to edit the image...'
                  : 'Describe the image you want to generate...'
                }
                rows={3}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              onClick={() => generate()}
              disabled={isGenerating || isUploading || (!prompt.trim())}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isUploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</>
              ) : isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Processing...</>
              ) : previewUrl ? (
                <><Wand2 className="w-4 h-4" />Edit with AI</>
              ) : (
                <><ImagePlus className="w-4 h-4" />Generate Image</>
              )}
            </button>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Quick Edit Prompts
          </h3>
          <div className="flex flex-wrap gap-2">
            {EDIT_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPrompt(p)
                  generate(p)
                }}
                disabled={isGenerating}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Results ({results.length})
              </h3>
              <button
                onClick={() => setResults([])}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Clear all
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border group animate-slide-up">
                  <div className="relative">
                    <img
                      src={result.url}
                      alt={result.prompt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button
                        onClick={() => downloadImage(result.url, i)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-xs text-muted-foreground line-clamp-2">{result.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/30 p-10 text-center">
            <Wand2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium text-muted-foreground">Your generated images will appear here</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Upload an image to edit, or generate from text</p>
          </div>
        )}

      </div>
    </div>
  )
}
