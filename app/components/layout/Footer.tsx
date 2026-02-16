export let text;

export default function Button({text}){
    return (
        <button className="bg-red-400 hover:bg-red-600" type="button">
            {text}
        </button>
    );
}