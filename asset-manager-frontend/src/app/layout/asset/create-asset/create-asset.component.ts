import { Component, Inject, OnInit } from "@angular/core";
import { AssetService } from "../../../shared/services/asset.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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
    suppliers: Supplier[] = [];
    categories: Category[] = [];
    selectedFile: File;
    actionButton: string = "Add";
    formName: string = "Add Asset";

    constructor(
        @Inject(MAT_DIALOG_DATA) public editData: any,
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

        this.http.get<any[]>('http://localhost:8080/api/v1/supplier/all').subscribe(res => this.suppliers = res);
        this.http.get<any[]>('http://localhost:8080/api/v1/category/all').subscribe(res => this.categories = res);

        if (this.editData) {
            this.formName = "Edit Asset";
            this.actionButton = "Update";
            this.form.controls['assetId'].setValue(this.editData.assetId);
            this.form.controls['name'].setValue(this.editData.name);
            this.form.controls['assetModelNumber'].setValue(this.editData.assetModelNumber);
            this.form.controls['serialNumber'].setValue(this.editData.serialNumber);
            this.form.controls['description'].setValue(this.editData.description);
            this.form.controls['price'].setValue(this.editData.price);
            this.form.controls['dateOfPurchase'].setValue(this.editData.dateOfPurchase);
            this.form.controls['dateOfManufacture'].setValue(this.editData.dateOfManufacture);
            this.form.controls['assetStatus'].setValue(this.editData.assetStatus);
            this.form.controls['supplierId'].setValue(this.editData.supplierId);
            this.form.controls['categoryId'].setValue(this.editData.supplierId);
            this.form.controls['image'].setValue(null);
        }
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    save(): void {
        if (!this.editData) {
            if (this.form.valid) {
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
                    () => {
                        this.snackbar.open('Asset created successfully!', 'Close', { duration: 3000 });
                        this.form.reset();
                        this.dialogRef.close();
                    }, () => {
                        this.snackbar.open('Error creating asset.', 'Close', { duration: 3000 });
                    }
                );
            }
        } else {
            this.update();
        }
    }

    update(): void {
        this.assetService.editAsset(this.editData.id, this.form.value).subscribe(
            () => {
                this.snackbar.open('Asset updated successfully!', 'Close', { duration: 3000 });
                this.form.reset();
                this.dialogRef.close();
            }, () => {
                this.snackbar.open('Error updating asset.', 'Close', { duration: 3000 });
            }
        );
    }
}
