export function OtherImagesList(props: {
    otherImagesUrls: string[],
    callbackfn: (url, index) => JSX.Element
}) {
    return <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-4">
            {props.otherImagesUrls.length > 0 ? (
                props.otherImagesUrls.slice(0, 3).map(props.callbackfn)
            ) : (
                <>
                    <button
                        className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                        <img
                            src="/placeholder.svg"
                            alt="Product Image 1"
                            width={150}
                            height={150}
                            className="aspect-square object-cover"
                        />
                    </button>
                    <button
                        className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                        <img
                            src="/placeholder.svg"
                            alt="Product Image 2"
                            width={150}
                            height={150}
                            className="aspect-square object-cover"
                        />
                    </button>
                    <button
                        className="border rounded-lg overflow-hidden transition-colors hover:border-primary">
                        <img
                            src="/placeholder.svg"
                            alt="Product Image 3"
                            width={150}
                            height={150}
                            className="aspect-square object-cover"
                        />
                    </button>
                </>
            )}
            {props.otherImagesUrls.length > 3 && (
                <div
                    className="border rounded-lg overflow-hidden flex items-center justify-center text-center text-muted-foreground">
                    And +{props.otherImagesUrls.length - 3} more images
                </div>
            )}
        </div>
    </div>;
}