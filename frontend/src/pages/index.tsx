import { useState } from 'react';
import axios from 'axios';
import IUploadResponse from '@/interface/IUploadResponse';
import { api } from '@/lib/axios';

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      const fileData = new FormData();
      fileData.append('file', selectedFile);

      try {
        const response = await axios.post<IUploadResponse>('/api/upload', fileData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Upload do Arquivo CSV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export const getServerSideProps = async () => {
  const [productsResponse, packsResponse, packsPricesResponse] = await Promise.all([
    api.get('products'),
    api.get('packs'),
    api.get('packs_prices')
  ]);

  return {
    props: {
      products: productsResponse.data,
      packs: packsResponse.data,
      packsPrices: packsPricesResponse,
    }
  }
}

export default Upload;