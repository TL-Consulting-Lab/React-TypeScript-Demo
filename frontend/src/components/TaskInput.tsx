import React, { useState, useEffect, useRef } from 'react';

interface TaskInputProps {
    onAddTask: (title: string) => Promise<void>;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [voiceText, setVoiceText] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<any>(null);

    const MAX_CHARACTERS = 200;

    useEffect(() => {
        // Check if browser supports Web Speech API
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                const truncatedText = transcript.substring(0, MAX_CHARACTERS);
                setVoiceText(truncatedText);
                setShowConfirmDialog(true);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            await onAddTask(title);
            setTitle('');
        }
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setVoiceText('');
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    const handleConfirmVoiceInput = async () => {
        if (voiceText.trim()) {
            await onAddTask(voiceText);
            setVoiceText('');
        }
        setShowConfirmDialog(false);
    };

    const handleCancelVoiceInput = () => {
        setVoiceText('');
        setShowConfirmDialog(false);
    };

    return (
        <div className="task-input-container">
            <form onSubmit={handleSubmit} className="task-input">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input__field"
                />
                <button type="submit" className="task-input__button">
                    Add Task
                </button>
            </form>

            {isSpeechSupported && (
                <div className="voice-input-section">
                    <p className="voice-input__character-limit">
                        Voice messages limited to {MAX_CHARACTERS} characters
                    </p>
                    <button
                        type="button"
                        onClick={startListening}
                        disabled={isListening}
                        className={`voice-input__button ${isListening ? 'listening' : ''}`}
                        aria-label="Start voice input"
                    >
                        <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            className="microphone-icon"
                        >
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                        {isListening ? 'Listening...' : 'Voice Input'}
                    </button>
                </div>
            )}

            {showConfirmDialog && (
                <div className="confirmation-dialog">
                    <div className="confirmation-dialog__content">
                        <h3>Confirm Voice Input</h3>
                        <p className="confirmation-dialog__text">"{voiceText}"</p>
                        <p className="confirmation-dialog__char-count">
                            {voiceText.length} / {MAX_CHARACTERS} characters
                        </p>
                        <div className="confirmation-dialog__buttons">
                            <button
                                onClick={handleConfirmVoiceInput}
                                className="confirmation-dialog__button confirm"
                            >
                                Add Task
                            </button>
                            <button
                                onClick={handleCancelVoiceInput}
                                className="confirmation-dialog__button cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskInput;