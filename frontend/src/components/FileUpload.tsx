import React, { useState, useCallback } from 'react';
import { Upload, FileCheck, Shield, Loader2, X, Sparkles } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isScanning?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isScanning = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    // Apelează direct funcția de scanare
    onFileUpload(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsUploading(false);
  };

  // Actualizează starea de upload când scanarea se termină
  React.useEffect(() => {
    if (!isScanning && isUploading) {
      setIsUploading(false);
    }
  }, [isScanning, isUploading]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative transition-all duration-500 ${
          isDragOver ? 'scale-105' : 'scale-100'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`glass-morphism rounded-3xl p-16 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-blue-400 bg-blue-500/10 shadow-2xl shadow-blue-500/25'
            : 'hover:bg-white/10'
        } ${(isUploading || isScanning) ? 'pointer-events-none' : ''}`}>
          
          {(isUploading || isScanning) ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">
                  {isScanning ? 'Scanning with VirusTotal' : 'Analyzing File'}
                </h3>
                <p className="text-xl text-gray-300">
                  {isScanning 
                    ? 'Checking against 70+ security engines...' 
                    : 'Preparing file for analysis...'
                  }
                </p>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : uploadedFile ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur-xl opacity-50"></div>
                <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                  <FileCheck className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">File Ready</h3>
                <div className="glass-morphism rounded-2xl p-6 max-w-md">
                  <p className="text-xl font-semibold text-white mb-2">{uploadedFile.name}</p>
                  <p className="text-gray-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetUpload}
                className="flex items-center space-x-2 px-6 py-3 text-gray-400 hover:text-white transition-all duration-300 glass-morphism rounded-xl"
              >
                <X className="w-5 h-5" />
                <span className="font-medium">Choose Different File</span>
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex justify-center">
                <div className="relative floating-animation">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl blur-2xl opacity-30"></div>
                  <div className="relative p-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl">
                    <Upload className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-white leading-tight">
                  Drop your file here for
                  <span className="text-gradient block">instant security analysis</span>
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Advanced threat detection powered by machine learning and 70+ antivirus engines
                </p>
              </div>
              
              <div className="space-y-6">
                <label className="group cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300">
                      Browse Files
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileInputChange}
                    accept="*/*"
                  />
                </label>
                
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="font-medium">256MB Max</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">All File Types</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Privacy Protected</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;