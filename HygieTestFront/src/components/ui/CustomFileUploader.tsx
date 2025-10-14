import { useState, type ChangeEvent } from "react"

type CustomFileUploaderProps = {
    label: string,
    setFile: (file: File) => void
}

export function CustomFileUploader({ label, setFile }: CustomFileUploaderProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.includes("image")) {
            setFile(selectedFile);

            // Create a preview URL for the selected image
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);

            // Optional: clean up the previous object URL when a new one is created
            return () => URL.revokeObjectURL(url);
        }
    }

    return <>
        <div className="w-full flex items-center space-x-4">
            <div className="flex-1">
                <p>{label}</p>
            </div>
            <div className="flex-8">
                <input type="file" accept="image/*" onChange={handleFileChange} className="rounded-xl p-6 shadow-md border" id="fileUploader" />
            </div>
        </div>
        <div>
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: "200px", height: "200px", marginTop: "1rem", borderRadius: "8px" }}
                />
            )}
        </div>
    </>
}