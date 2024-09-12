import "./addShowMessage.css";
import { useChatStore } from "../../../lib/chatStore"

const AddShowMessage = ({setAddShowMessage}) => {
  const { changeKey } = useChatStore();

  const handleClose = (e) => {
    e.preventDefault();
    setAddShowMessage(prev => !prev); // Call toggleAddMode function to toggle addMode state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.closest('form')); // Target the form element
    const key = parseInt(formData.get("key")); // Parse key to integer
    changeKey(key);
  }

  return (
    <div className="addShowMessage">
      <h4>
        Enter a key to view your messages.
      </h4>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Key..." name="key" />
        <button type="submit">OK</button>
        <button className="close" onClick={handleClose}>Close</button>
      </form>
    </div>
  );
};

export default AddShowMessage