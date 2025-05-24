import ReactQuill from 'react-quill-new';
import "./WirteReview.css";

interface ReactQuillEditorProps {
    style?: React.CSSProperties;
    value?: string;
    onChange: (value: string) => void;
}

function ReactQuillEditor({ style, value, onChange }: ReactQuillEditorProps) {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    };
    return (
        <>
            <ReactQuill 
                className="quill"
                placeholder="이 강의에 대한 총평을 작성해주세요 (100자 이내). 욕설, 비하적인 말은 지양해주세요."
                style={style} 
                modules={modules} 
                value={value} 
                onChange={onChange} 
            />
        </>
    );
}
export default ReactQuillEditor;