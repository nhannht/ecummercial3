import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProductDetails from "../shop/ProductDetails";

const modules = {
    toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]


const ProductDescriptionEditor = ({content,setContent}) => {

    const handleSave = () => {
        console.log(content)
    };


    return (
        <div className="product-editor">
            <ReactQuill value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
            />




        </div>
    );
};

export default ProductDescriptionEditor;