import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile!: File | null;
  constructor(private formBuild: FormBuilder,
    private route: Router,
    private prodService: ProductService
  ) { }

  productForm!: FormGroup;
  ngOnInit(): void {
    this.productForm = this.formBuild.group({
      prodTitle: ['', Validators.required],
      prodDesc: ['', Validators.required],
      prodCategory: ['', Validators.required],
      prodSize: ['', Validators.required],
      prodColor: ['', Validators.required],
      prodPrice: ['', Validators.required],
      // prodAvlQuantity:['',Validators.required],
      prodFile: ['', Validators.required],

    })
  }

  // file upload

  // onFileChange(event) {
  //   let file = this.productForm.get('prodFile')?.value;
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }


  onSubmit() {
    console.log(this.productForm);
    if (this.productForm.valid) {
      const formData = new FormData();



      formData.append('title', this.productForm.value.prodTitle);
      formData.append('desc', this.productForm.value.prodDesc);

      formData.append('categories', this.productForm.value.prodCategory);
      formData.append('size', this.productForm.value.prodSize);
      formData.append('color', this.productForm.value.prodColor);
      formData.append('price', this.productForm.value.prodPrice);

      formData.append('img', this.productForm.value.prodFile);

      this.prodService.postProduct(formData).subscribe((resp) => {
        console.log("Response>>>", resp);
        if (resp) {
          console.log("Product saved successfully...")
        } else {
          console.log("Product not saved!...");
        }
      })
    } else {
      console.log(`Form is invalid!...`);
    }
  }

  onCancel() {
    this.route.navigate(['/main/product']);
  }

}
