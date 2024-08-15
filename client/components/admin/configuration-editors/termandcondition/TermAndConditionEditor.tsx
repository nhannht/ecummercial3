import {useState} from 'react';
import ReactQuill from 'react-quill';
import {Button} from "../../../ui/button";

const modules = {
    toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean'],

    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]
const TermsAndConditionsEditor = () => {
    const [content, setContent] = useState('');

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/configuration/termandcondition/main', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({content}),
            });

            if (response.ok) {
                alert('Content updated successfully');
            } else {
                console.error('Error updating content:', await response.text());
            }
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };

    return (
        <div>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
            />
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default TermsAndConditionsEditor;