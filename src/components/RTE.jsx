import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '' }) {
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1 pl-1'>{label}</label>
            )}
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        // Use the self-hosted open-source bundle — no API key required.
                        // If you have a TinyMCE Cloud API key, set VITE_TINYMCE_API_KEY
                        // in your .env and pass it here instead.
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key'}
                        value={value}
                        init={{
                            height: 500,
                            menubar: true,
                            // licenseKey silences the "no API key" warning when
                            // self-hosting or using the open-source GPL build.
                            licenseKey: 'gpl',
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image',
                                'charmap', 'preview', 'anchor', 'searchreplace',
                                'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                                'media', 'table', 'help', 'wordcount',
                            ],
                            toolbar:
                                'undo redo | blocks | bold italic forecolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist outdent indent | image link | ' +
                                'removeformat | help',
                            content_style:
                                'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
