import React, { useState } from 'react'
import axios from 'axios'

function PasswordCard({password}) {
    const [showPassword, setShowPassword] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [inputKey, setInputKey] = useState('')
    const [decryptedPassword, setDecryptedPassword] = useState('ks834hd@r44')
    const [encryptedPassword] = useState('my-encrypted-password') // Mock encrypted password

    const handleTogglePassword = () => {
        if (!showPassword) {
            setModalOpen(true) // Open the modal
        } else {
            setShowPassword(false)
            setDecryptedPassword('*********')
        }
    }

    const handleDecryptPassword = (e) => {
        // Simulate decryption process
        
        setModalOpen(false) // Close the modal after checking the key
    }

    return (
        <div className="w-[80%] mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
                <span className="text-lg font-medium">{password.website}</span>
                <div className="flex items-center space-x-2">
                    {/* <p type="text" class="w-48 rounded-lg border p-2" value={password.password}/> */}
                    <p className="w-auto rounded-lg border p-2">{password.password}</p>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Key</h2>
                        <input
                            type="password"
                            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="Enter your key"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleDecryptPassword}
                                className="bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 mr-2"
                            >
                                Decrypt
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PasswordCard
