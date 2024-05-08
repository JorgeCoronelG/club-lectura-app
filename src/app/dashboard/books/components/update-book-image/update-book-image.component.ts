import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Libro } from '@shared/models/libro.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sizeFile } from '@shared/utils/form-validations.utils';
import { MaterialModule } from '@shared/material/material.module';
import { NgIf } from '@angular/common';
import { UrlPipe } from '@shared/pipes/url/url.pipe';
import { BookService } from '@shared/services/book.service';

@Component({
  selector: 'app-update-book-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    UrlPipe,
  ],
  templateUrl: './update-book-image.component.html',
  styles: []
})
export class UpdateBookImageComponent implements OnInit {
  fileForm!: FormGroup;
  imgTemp: ArrayBuffer|string|null = null;

  constructor(
    private dialogRef: MatDialogRef<UpdateBookImageComponent>,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: Libro,
  ) {
    //
  }

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      imagen: [null, Validators.required],
      imageSrc: [null, sizeFile(5000)]
    });
  }

  changeImage(event: any): void {
    if (!event.target['files']) {
      return;
    }

    const file = event.target.files[0];

    this.fileForm.patchValue({
      imageSrc: file
    });

    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.cd.markForCheck();
    }
  }

  save(): void {
    if (this.fileForm.invalid) {
      this.fileForm.markAllAsTouched();
      return;
    }

    const { imageSrc } = this.fileForm.getRawValue();
    this.bookService.updateImage(this.data.id, imageSrc).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
