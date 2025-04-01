// Document management functions

// Function to upload a document
function uploadDocument(formData, successCallback, errorCallback) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No authentication token found');
        if (errorCallback) errorCallback(new Error('Authentication required'));
        return;
    }
    
    // Debug what's being sent
    console.log("Uploading document with token:", token.substring(0, 20) + "...");
    console.log("Form data contains file:", formData.has('file'));
    console.log("Form data document type:", formData.get('documentType'));
    
    fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type header for multipart/form-data
        },
        body: formData,
    })
    .then(response => {
        // Log detailed response information
        console.log('Upload response status:', response.status);
        console.log('Upload response status text:', response.statusText);
        
        if (!response.ok) {
            return response.text().then(text => {
                console.error('Upload error response:', text);
                try {
                    const data = JSON.parse(text);
                    throw new Error(data.error || `Upload failed: ${response.status}`);
                } catch (e) {
                    throw new Error(text || `Upload failed: ${response.status}`);
                }
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Upload success:', data);
        if (successCallback) successCallback(data);
    })
    .catch(error => {
        console.error('Error uploading document:', error);
        if (errorCallback) errorCallback(error);
    });
}

// Function to get user's documents
function getUserDocuments(successCallback, errorCallback) {
    console.log("Fetching user documents...");
    fetchWithAuth('/api/documents/my-documents')
    .then(response => {
        console.log("My documents response status:", response.status);
        if (!response.ok) {
            return response.text().then(text => {
                console.error("Error response body:", text);
                throw new Error('Failed to fetch documents: ' + response.status);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(`Retrieved ${data.length} documents`);
        if (successCallback) successCallback(data);
    })
    .catch(error => {
        console.error('Error fetching documents:', error);
        if (errorCallback) errorCallback(error);
        else {
            // Show error message in document containers
            document.querySelectorAll('.document-list').forEach(container => {
                container.innerHTML = `<p class="error-message">Error loading documents: ${error.message}</p>`;
            });
        }
    });
}

// Function to get documents related to user
function getRelatedDocuments(successCallback, errorCallback) {
    console.log("Fetching related documents...");
    fetchWithAuth('/api/documents/related-documents')
    .then(response => {
        console.log("Related documents response status:", response.status);
        if (!response.ok) {
            return response.text().then(text => {
                console.error("Error response body:", text);
                throw new Error('Failed to fetch related documents: ' + response.status);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(`Retrieved ${data.length} related documents`);
        if (successCallback) successCallback(data);
    })
    .catch(error => {
        console.error('Error fetching related documents:', error);
        if (errorCallback) errorCallback(error);
        else {
            // Show error in related documents container
            const container = document.getElementById('patient-related-documents');
            if (container) {
                container.innerHTML = `<p class="error-message">Error loading related documents: ${error.message}</p>`;
            }
        }
    });
}

// Function to get documents by type
function getDocumentsByType(documentType, successCallback, errorCallback) {
    fetchWithAuth(`/api/documents/by-type/${documentType}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (successCallback) successCallback(data);
    })
    .catch(error => {
        console.error(`Error fetching ${documentType} documents:`, error);
        if (errorCallback) errorCallback(error);
    });
}

// Function to download a document
function downloadDocument(documentId, filename) {
    const token = localStorage.getItem('token');
    
    // Create a hidden link element
    const link = document.createElement('a');
    link.href = `/api/documents/${documentId}`;
    link.target = '_blank';
    link.download = filename || 'document';
    
    // Add authorization header via cookie or local storage
    if (token) {
        // For simplicity we'll open in a new tab, but in a real app
        // you'd use fetch with authorization headers and create a blob URL
        fetch(`/api/documents/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
        });
    } else {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Function to delete a document
function deleteDocument(documentId, successCallback, errorCallback) {
    fetchWithAuth(`/api/documents/${documentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (successCallback) successCallback(data);
    })
    .catch(error => {
        console.error('Error deleting document:', error);
        if (errorCallback) errorCallback(error);
    });
}

// Function to create a document list with actions
function createDocumentList(documents, container, canDelete = false) {
    // Clear container first
    container.innerHTML = '';
    
    if (!documents || documents.length === 0) {
        container.innerHTML = '<p>No documents found.</p>';
        return;
    }
    
    // Create a table for documents
    const table = document.createElement('table');
    table.className = 'document-table';
    
    // Add header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>File Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Uploaded By</th>
        <th>Upload Date</th>
        <th>Actions</th>
    `;
    table.appendChild(headerRow);
    
    // Add document rows
    documents.forEach(doc => {
        const row = document.createElement('tr');
        
        // Format the date
        const uploadDate = new Date(doc.uploadDate);
        const formattedDate = uploadDate.toLocaleDateString() + ' ' + uploadDate.toLocaleTimeString();
        
        row.innerHTML = `
            <td>${doc.fileName}</td>
            <td>${doc.documentType}</td>
            <td>${doc.description || '-'}</td>
            <td>${doc.uploadedBy}</td>
            <td>${formattedDate}</td>
            <td>
                <button class="btn-download" data-id="${doc.id}" data-filename="${doc.fileName}">Download</button>
                ${canDelete ? `<button class="btn-delete" data-id="${doc.id}">Delete</button>` : ''}
            </td>
        `;
        
        table.appendChild(row);
    });
    
    container.appendChild(table);
    
    // Add event listeners for download buttons
    container.querySelectorAll('.btn-download').forEach(button => {
        button.addEventListener('click', function() {
            const docId = this.getAttribute('data-id');
            const filename = this.getAttribute('data-filename');
            downloadDocument(docId, filename);
        });
    });
    
    // Add event listeners for delete buttons
    if (canDelete) {
        container.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const docId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this document?')) {
                    deleteDocument(docId, () => {
                        // Refresh the document list after deletion
                        this.closest('tr').remove();
                    });
                }
            });
        });
    }
}

// Initialize document upload components
function initDocumentUpload(formId, documentTypeOptions) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = this.querySelector('input[type="file"]');
        const documentTypeSelect = this.querySelector('select[name="documentType"]');
        const descriptionInput = this.querySelector('textarea[name="description"]');
        const relatedUserIdInput = this.querySelector('input[name="relatedUserId"]');
        
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please select a file to upload');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('documentType', documentTypeSelect.value);
        formData.append('description', descriptionInput.value);
        
        if (relatedUserIdInput && relatedUserIdInput.value) {
            formData.append('relatedUserId', relatedUserIdInput.value);
        }
        
        // Show loading spinner
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Uploading...';
        
        uploadDocument(formData, 
            // Success callback
            (response) => {
                alert('Document uploaded successfully!');
                fileInput.value = '';
                descriptionInput.value = '';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Refresh document lists if needed
                if (typeof refreshDocumentLists === 'function') {
                    refreshDocumentLists();
                }
            },
            // Error callback
            (error) => {
                alert('Failed to upload document: ' + error.message);
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        );
    });
    
    // Populate document type options if provided
    if (documentTypeOptions && documentTypeOptions.length > 0) {
        const select = form.querySelector('select[name="documentType"]');
        if (select) {
            select.innerHTML = '';
            documentTypeOptions.forEach(option => {
                const optionEl = document.createElement('option');
                optionEl.value = option.value;
                optionEl.textContent = option.text;
                select.appendChild(optionEl);
            });
        }
    }
}
