import React from 'react';
import { Shield, ShieldAlert, FileText, Hash, Calendar, Scan, Download, RotateCcw } from 'lucide-react';

interface ScanResultsProps {
  results: {
    fileName: string;
    fileSize: number;
    scanDate: string;
    isClean: boolean;
    threatCount: number;
    engines: {
      total: number;
      detected: number;
    };
    hash: string;
  };
  onNewScan: () => void;
}

const ScanResults: React.FC<ScanResultsProps> = ({ results, onNewScan }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Results Header */}
      <div className="text-center space-y-8">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${
            results.isClean 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-pink-600'
          }`}></div>
          <div className={`relative inline-flex items-center space-x-4 px-8 py-4 rounded-full glass-morphism ${
            results.isClean 
              ? 'border-green-500/30' 
              : 'border-red-500/30'
          }`}>
            {results.isClean ? (
              <Shield className="w-8 h-8 text-green-400" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-red-400" />
            )}
            <span className={`font-bold text-2xl ${
              results.isClean ? 'text-green-400' : 'text-red-400'
            }`}>
              {results.isClean ? 'File is Secure' : `${results.threatCount} Threat${results.threatCount > 1 ? 's' : ''} Detected`}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white">Analysis Complete</h2>
          <p className="text-xl text-gray-300 font-light">
            Comprehensive security analysis using {results.engines.total} detection engines
          </p>
        </div>
      </div>

      {/* Scan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-morphism rounded-3xl p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-30"></div>
            <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
              <Scan className="w-8 h-8 text-white mx-auto" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Detection Rate</h3>
          <p className="text-4xl font-black text-white mb-2">
            {results.engines.detected} / {results.engines.total}
          </p>
          <p className="text-gray-400 font-medium">
            {((results.engines.detected / results.engines.total) * 100).toFixed(1)}% detection coverage
          </p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-30"></div>
            <div className="relative p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl">
              <FileText className="w-8 h-8 text-white mx-auto" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">File Details</h3>
          <p className="text-xl font-bold text-white mb-2 truncate">
            {results.fileName}
          </p>
          <p className="text-gray-400 font-medium">
            {formatFileSize(results.fileSize)}
          </p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-30"></div>
            <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
              <Calendar className="w-8 h-8 text-white mx-auto" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Scan Time</h3>
          <p className="text-xl font-bold text-white mb-2">
            {formatDate(results.scanDate)}
          </p>
          <p className="text-gray-400 font-medium">
            Completed successfully
          </p>
        </div>
      </div>

      {/* File Hash */}
      <div className="glass-morphism rounded-3xl p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl blur opacity-30"></div>
            <div className="relative p-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl">
              <Hash className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">File Signature</h3>
        </div>
        <div className="glass-morphism rounded-2xl p-6">
          <code className="text-lg text-gray-300 font-mono break-all leading-relaxed">
            {results.hash}
          </code>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        <button
          onClick={onNewScan}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300">
            <RotateCcw className="w-5 h-5" />
            <span>Scan Another File</span>
          </div>
        </button>
        
        <button className="group glass-morphism rounded-2xl px-10 py-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center space-x-3 text-gray-300 group-hover:text-white font-bold text-lg">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ScanResults;