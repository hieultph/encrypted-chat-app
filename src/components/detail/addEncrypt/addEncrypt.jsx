import "./addEncrypt.css";
import { toast } from "react-toastify";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc, collection, where, query, getDocs, collectionGroup } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";
import { encryptCaesar, decryptCaesar } from "../../../lib/caesarCipher";

const AddEncrypt = ({setAddEncrypt}) => {
  const { chatId, isEncrypted, changeEncrypt } = useChatStore();

  const handleEncrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.closest('form')); // Target the form element
    const key = parseInt(formData.get("key")); // Parse key to integer
  
    try {
      const chatDocRef = doc(db, "chats", chatId);

      const userchatsRef = collection(db, "userchats");
      const querySnapshot = await getDocs(userchatsRef);

      if (!querySnapshot.empty) {
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          const userchatData = querySnapshot.docs[i].data();
          const chats = userchatData.chats;
      
          for (let j = 0; j < chats.length; j++) {
            if (chats[j].chatId === chatId) {
              chats[j].lastMessage = encryptCaesar(chats[j].lastMessage, key);
    
              // Update the chat document with the modified chats array
              await updateDoc(querySnapshot.docs[i].ref, {
                chats: chats
              });
            }
          }
        }
      }
  
      if (!chatDocRef.empty) {
        const chatDocSnap = await getDoc(chatDocRef);
        if (chatDocSnap.exists()) {
          const messages = chatDocSnap.data().messages;

          // Iterate through each message in the chat
          for (let i = 0; i < messages.length; i++) {
            // Encrypt the message using Caesar cipher
            messages[i].text = encryptCaesar(messages[i].text, key);
          }

          // Update the chat document with the encrypted messages
          await updateDoc(chatDocRef, { messages: messages, encrypted: true });
          toast.success("Message encrypted!");
          changeEncrypt();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.closest('form')); // Target the form element
    const key = parseInt(formData.get("key")); // Parse key to integer
  
    try {
      const chatDocRef = doc(db, "chats", chatId);

      const userchatsRef = collection(db, "userchats");
      const querySnapshot = await getDocs(userchatsRef);

      if (!querySnapshot.empty) {
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          const userchatData = querySnapshot.docs[i].data();
          const chats = userchatData.chats;
      
          for (let j = 0; j < chats.length; j++) {
            if (chats[j].chatId === chatId) {
              chats[j].lastMessage = decryptCaesar(chats[j].lastMessage, key);
    
              // Update the chat document with the modified chats array
              await updateDoc(querySnapshot.docs[i].ref, {
                chats: chats
              });
            }
          }
        }
      }
  
      if (!chatDocRef.empty) {
        const chatDocSnap = await getDoc(chatDocRef);
        if (chatDocSnap.exists()) {
          const messages = chatDocSnap.data().messages;

          // Iterate through each message in the chat
          for (let i = 0; i < messages.length; i++) {
            // Encrypt the message using Caesar cipher
            messages[i].text = decryptCaesar(messages[i].text, key);
          }

          // Update the chat document with the encrypted messages
          await updateDoc(chatDocRef, { messages: messages, encrypted: false });
          toast.success("Message decrypted!");
          changeEncrypt();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAddEncrypt(prev => !prev); // Call toggleAddMode function to toggle addMode state
  };

  return (
    <div className="addEncrypt">
      <h4>
        {isEncrypted
         ? "Do you want to decrypt your message?"
          : "Do you want to encrypt your message?"}
      </h4>
      <form onSubmit={handleDecrypt}>
        <input type="text" placeholder="Key..." name="key" />
        <button onClick={isEncrypted ? handleDecrypt : handleEncrypt}>
          {isEncrypted
           ? "Decrypt"
            : "Encrypt"}
        </button>
        <button className="close" onClick={handleClose}>Close</button>
      </form>
    </div>
  );
};

export default AddEncrypt;
