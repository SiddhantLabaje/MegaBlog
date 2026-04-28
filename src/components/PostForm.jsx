import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from './index'
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title:   post?.title   || '',
            slug:    post?.$id     || '',
            content: post?.content || '',
            status:  post?.status  || 'active',
        },
    })

    const navigate  = useNavigate()
    const userData  = useSelector((state) => state.auth.userData)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const submit = async (data) => {
        setSubmitError('')
        setSubmitting(true)
        try {
            if (post) {
                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null

                if (file) await appwriteService.deleteFile(post.featuredImage)

                const dbPost = await appwriteService.upadatePost(post.$id, {
                    title:         data.title,
                    content:       data.content,
                    status:        data.status,
                    featuredImage: file ? file.$id : post.featuredImage,
                })
                if (dbPost?.$id) navigate(`/post/${dbPost.$id}`)

            } else {
                if (!userData?.$id) { setSubmitError('You must be logged in.'); return }

                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null

                if (!file?.$id) { setSubmitError('Image upload failed. Please try again.'); return }

                const dbPost = await appwriteService.createPost({
                    title:         data.title,
                    slug:          data.slug,
                    content:       data.content,
                    status:        data.status,
                    featuredImage: file.$id,
                    userId:        userData.$id,
                })
                if (dbPost?.$id) navigate(`/post/${dbPost.$id}`)
            }
        } catch (err) {
            setSubmitError(err.message || 'Something went wrong.')
        } finally {
            setSubmitting(false)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        return ''
    }, [])

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name === 'title')
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
        })
        return () => sub.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Form header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">
                    {post ? 'Edit Post' : 'New Post'}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                    {post ? 'Update your post details below.' : 'Fill in the details to publish a new post.'}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="p-6">
                {submitError && (
                    <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-red-600">{submitError}</p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* ── Left column: main content ── */}
                    <div className="flex-1 space-y-5">
                        <Input
                            label="Title"
                            placeholder="Enter post title…"
                            error={errors.title?.message}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <Input
                            label="Slug"
                            placeholder="post-url-slug"
                            error={errors.slug?.message}
                            {...register('slug', { required: 'Slug is required' })}
                            onInput={(e) =>
                                setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Content
                            </label>
                            <RTE name="content" control={control} defaultValue={getValues('content')} />
                        </div>
                    </div>

                    {/* ── Right column: meta ── */}
                    <div className="lg:w-72 space-y-5">
                        {/* Featured image */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Featured Image
                            </label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors duration-200">
                                <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                                    {...register('image', { required: !post })}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-500">Image is required</p>
                                )}
                            </div>

                            {/* Current image preview (edit mode) */}
                            {post?.featuredImage && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <p className="text-xs text-slate-400 text-center py-1.5 bg-slate-50">
                                        Current image — upload a new one to replace
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <Select
                            options={['active', 'inactive']}
                            label="Status"
                            {...register('status', { required: true })}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant={post ? 'success' : 'primary'}
                            disabled={submitting}
                            className="w-full"
                        >
                            {submitting ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    {post ? 'Updating…' : 'Publishing…'}
                                </>
                            ) : (
                                post ? 'Update Post' : 'Publish Post'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
