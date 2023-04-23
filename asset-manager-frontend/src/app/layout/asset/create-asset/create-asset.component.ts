import { Component, OnInit } from "@angular/core";
import { AssetService } from "../../../shared/services/asset.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Supplier } from "../../../shared/models/supplier.model";
import { Category } from "../../../shared/models/category.model";

@Component({
    selector: 'app-create-asset',
    templateUrl: 'create-asset.component.html',
    styleUrls: ['create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {
    form: FormGroup;
    assetStatuses: string[] = ['NEW', 'REFURBISHED', 'OLD'];
    actions: string[] = ['Add', 'Remove'];
    suppliers: Supplier[] = [];
    categories: Category[] = [];
    selectedFile: File;

    constructor(
        private assetService: AssetService,
        private http: HttpClient,
        private snackbar: MatSnackBar,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateAssetComponent>
    ) { }

    ngOnInit(): void {

        this.form = this.fb.group({
            assetId: ['', Validators.required],
            name: ['', Validators.required],
            assetModelNumber: ['', Validators.required],
            serialNumber: ['', Validators.required],
            description: [''],
            price: [0, Validators.required],
            dateOfPurchase: [null, Validators.required],
            dateOfManufacture: [null, Validators.required],
            assetStatus: ['', Validators.required],
            supplierId: ['', Validators.required],
            categoryId: ['', Validators.required],
            image: [null, Validators.required]
        });

        this.http.get<any[]>('http://localhost:8080/api/v1/supplier/all').subscribe(res => {
            this.suppliers = res;
        });

        this.http.get<any[]>('http://localhost:8080/api/v1/category/all').subscribe(res => {
            this.categories = res;
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    save(): void {
        const formData = new FormData();
        formData.append('assetId', this.form.get('assetId').value);
        formData.append('name', this.form.get('name').value);
        formData.append('assetModelNumber', this.form.get('assetModelNumber').value);
        formData.append('serialNumber', this.form.get('serialNumber').value);
        formData.append('price', this.form.get('price').value);
        formData.append('categoryId', this.form.get('categoryId').value);
        formData.append('dateOfPurchase', this.form.get('dateOfPurchase').value);
        formData.append('dateOfManufacture', this.form.get('dateOfManufacture').value);
        formData.append('assetStatus', this.form.get('assetStatus').value);
        formData.append('supplierId', this.form.get('supplierId').value);
        formData.append('description', this.form.get('description').value);
        formData.append('image', this.selectedFile, this.selectedFile.name);

        this.assetService.addAsset(formData).subscribe(
            res => {
                this.snackbar.open('Asset created successfully!', 'Close', { duration: 3000 });
                this.form.reset();
                this.dialogRef.close();
            }, err => {
                this.snackbar.open('Error creating asset.', 'Close', { duration: 3000 });
            }
        );
    }
}
