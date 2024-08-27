import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';

 function States() {
     const [products, setProducts] = useState([]);

     useEffect(() => {
         fetch('http://localhost:5000/api/products')
             .then(response => response.json())
             .then(data => setProducts(data))
             .catch(error => console.error('Error fetching products:', error));
     }, []);

     return (
         <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
             <Column field="fullname" header="Code"></Column>
             <Column field="emailid" header="Name"></Column>
             <Column field="model" header="Category"></Column>
             <Column field="service" header="Quantity"></Column>
         </DataTable>
     );
 }

export default States;
