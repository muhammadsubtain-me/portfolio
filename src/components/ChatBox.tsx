import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import './styles/ChatBox.css';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox = ({ isOpen, onClose }: ChatBoxProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/muhammadsubtain.cs@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`
        })
      });
      setSuccess(true);
      form.reset();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbox-header">
        <div className="chatbox-header-info">
          <FaUserCircle size={30} />
          <div>
            <h4>Muhammad Subtain</h4>
            <p><span className="online-dot"></span> Online</p>
          </div>
        </div>
        <button onClick={onClose} className="chatbox-close">
          <MdClose />
        </button>
      </div>
      <div className="chatbox-body">
        <div className="chatbox-message">
          Hi there! 👋 I'd love to hear from you. Please share your details and I'll get back to you soon!
        </div>
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0", color: "#4CAF50", fontWeight: "bold" }}>
            Message Sent Successfully! ✅
            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px", fontWeight: "normal" }}>
              Note: The first time you receive a message, you may need to click an activation link sent to your email by FormSubmit.
            </p>
          </div>
        ) : (
          <form className="chatbox-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Your email" required />
            <textarea name="message" placeholder="Your message..." rows={4} required></textarea>
            <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
