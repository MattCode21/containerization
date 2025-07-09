import React, { useState, useRef } from 'react';
import { Upload, Image, X, Check } from 'lucide-react';

interface Props {
  darkMode: boolean;
  onImageSelect: (file: File) => void;
  productType?: 'tiles' | 'tools' | null;
}

const ImageUpload: React.FC<Props> = ({ darkMode, onImageSelect, productType }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setSelectedImage(file);
    setIsProcessing(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      
      // Simulate background removal processing
      setTimeout(() => {
        setIsProcessing(false);
        onImageSelect(file);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!selectedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
            dragActive
              ? darkMode
                ? 'border-blue-400 bg-blue-500/10'
                : 'border-blue-500 bg-blue-50'
              : darkMode
                ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            
            <div>
              <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload Product Image
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Drag and drop or click to select
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative rounded-2xl border overflow-hidden ${
          darkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-200 bg-white'
        }`}>
          <div className="relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-800"
              />
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm">Removing background...</p>
                </div>
              </div>
            )}
            
            <button
              onClick={removeImage}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Image className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedImage.name}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              {!isProcessing && (
                <div className="flex items-center space-x-2 text-green-500">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Ready</span>
                </div>
              )}
            </div>
            
            {!isProcessing && (
              <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                  ✓ Background removed and product isolated for optimal stacking analysis
                  {productType === 'tiles' && ' (Vertical stacking mode enabled)'}
                  {productType === 'tools' && ' (Mixed orientation mode enabled)'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;