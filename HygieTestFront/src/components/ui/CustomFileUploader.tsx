import { useState, type ChangeEvent } from "react"

type CustomFileUploaderProps = {
    label: string,
    setFile: (file: File) => void
}

/**
 * le file uploader standard de type image uniquement
 * @param label le label du file uploader qui sera afficher sur sa gauche
 * @param setFile la méthode qui permet d'enregisrer le file et qui sera exécutée à l'upload du file
 */

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

    /*return <>
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
    </>*/
    return (
        <div className="w-full flex flex-col items-center space-y-4">
            <p className="text-gray-700 font-medium">{label}</p>
            <label className="
                w-full
                max-w-md 
                cursor-pointer 
                flex flex-col 
                items-center justify-center 
                px-6 py-4 
                border-2 border-dashed border-gray-300 rounded-xl 
                bg-gray-50 
                hover:border-blue-400 hover:bg-blue-50 
                transition-colors text-center">
                {previewUrl ? (
                    <img src={previewUrl} className="w-40 h-40 object-cover rounded-lg shadow-md" />
                ) : (
                    <span className="text-gray-400">Cliquez ou glissez votre image ici</span>
                )}
                <input type="file" accept="image/*" id="fileUploader" onChange={handleFileChange} className="hidden" />
            </label>

            {previewUrl && (
                <div className="mt-2">
                    <p className="text-gray-600 text-sm text-center">Prévisualisation :</p>
                </div>
            )}
        </div>
    );
}
