'use client'

import React, { useState, useCallback } from 'react'
import { Upload, Image as ImageIcon, Download, Printer, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link'
import { Home, Settings, HelpCircle } from 'lucide-react'

export function MedicalDashboard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [leftFootImage, setLeftFootImage] = useState<string | null>(null)
  const [rightFootImage, setRightFootImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [displayOption, setDisplayOption] = useState('both')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [])

  const handleFile = useCallback(async (file: File) => {
    const previewUrl = URL.createObjectURL(file)
    setSelectedImage(previewUrl)

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('https://671be00c81a5f4a93bd4891e--dashboard-podologie.netlify.app/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setIsProcessing(false)

      if (res.ok) {
        console.log("Fichier uploadé avec succès, réponse : ", data)
        setProcessedImage(data.processed_image)
        setLeftFootImage(data.left_foot)
        setRightFootImage(data.right_foot)
      } else {
        console.error('Erreur lors de l\'upload', data.error)
        alert('Erreur lors de l\'upload. Veuillez réessayer.')
      }
    } catch (error) {
      setIsProcessing(false)
      console.error('Erreur lors de la requête', error)
      alert('Erreur lors de la requête. Veuillez vérifier la connexion au serveur.')
    }
  }, [])

  const renderProcessedImage = () => {
    switch (displayOption) {
      case 'left':
        return leftFootImage ? (
          <img src={leftFootImage} alt="Pied gauche" className="w-full h-64 object-contain" />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
            Pied gauche non disponible
          </div>
        )
      case 'right':
        return rightFootImage ? (
          <img src={rightFootImage} alt="Pied droit" className="w-full h-64 object-contain" />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
            Pied droit non disponible
          </div>
        )
      default:
        return processedImage ? (
          <img src={processedImage} alt="Image traitée" className="w-full h-64 object-contain" />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
            <ImageIcon className="h-12 w-12" />
          </div>
        )
    }
  }

  const handleDownload = () => {
    let imageToDownload = processedImage;
    let fileName = 'processed_foot_scan.jpg';
  
    switch (displayOption) {
      case 'left':
        imageToDownload = leftFootImage;
        fileName = 'left_foot_scan.jpg';
        break;
      case 'right':
        imageToDownload = rightFootImage;
        fileName = 'right_foot_scan.jpg';
        break;
    }
  
    if (imageToDownload) {
      const link = document.createElement('a');
      link.href = imageToDownload;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    let imageToPrint = processedImage;
    let title = 'Impression du scan des deux pieds';
  
    switch (displayOption) {
      case 'left':
        imageToPrint = leftFootImage;
        title = 'Impression du scan du pied gauche';
        break;
      case 'right':
        imageToPrint = rightFootImage;
        title = 'Impression du scan du pied droit';
        break;
    }

    if (imageToPrint) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title}</title>
              <style>
                @page {
                  size: A4;
                  margin: 0;
                }
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                img {
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                }
              </style>
            </head>
            <body>
              <img src="${imageToPrint}" alt="${title}" />
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();

         // Attendez que l'image soit chargée avant d'imprimer
         const img = printWindow.document.querySelector('img');
         if (img) {
           img.onload = () => {
             printWindow.print();
             printWindow.onafterprint = () => {
               printWindow.close();
             };
           };
         } else {
           printWindow.print();
           printWindow.onafterprint = () => {
             printWindow.close();
           };
         }
       }
     }
   };
 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                  <Home className="mr-2 h-4 w-4" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/settings" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </li>
              <li>
                <Link href="/help" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Aide
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="mb-4">
          <Button onClick={toggleSidebar} variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Traitement Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Image upload area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p>Cliquez pour sélectionner une image ou glissez-déposez ici</p>
                  </div>
                </Label>
              </div>

              {/* Display options */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Affichage</h3>
                <RadioGroup value={displayOption} onValueChange={setDisplayOption} className="flex flex-wrap space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Les deux pieds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="left" />
                    <Label htmlFor="left">Pied gauche</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="right" />
                    <Label htmlFor="right">Pied droit</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Image display areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Image originale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedImage ? (
                      <img src={selectedImage} alt="Original" className="w-full h-64 object-contain" />
                    ) : (
                      <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                        Aucune image uploadée
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Image traitée</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isProcessing ? (
                      <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                        Traitement en cours...
                      </div>
                    ) : (
                      renderProcessedImage()
                    )}
                  </CardContent>
                </Card>
                {/* Boutons de téléchargement et d'impression */}
                {(processedImage || leftFootImage || rightFootImage) && (
                  <div className="col-span-2 flex justify-end space-x-2 mt-4">
                    <Button
                      onClick={handleDownload}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Télécharger</span>
                    </Button>
                    <Button
                      onClick={handlePrint}
                      className="flex items-center space-x-2"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Imprimer en A4</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}