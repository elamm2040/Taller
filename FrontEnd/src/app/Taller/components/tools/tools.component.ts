import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Mus} from "../../General/models/mus";
import {MUService} from "../../General/services/mu.service";
import {ToolsService} from "../../General/services/tools.service";
import swal from "sweetalert2";
import {Tools} from "../../General/models/tools";
import {
  faTrashAlt,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  loading: boolean = true;

  public formTool: FormGroup;

  allMus: Array<Mus> = [];
  allTools: Array<Tools> = [];

  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500
  });

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private formBuilder: FormBuilder,
              private muSer: MUService,
              private toolSer: ToolsService) {
    this.formTool = this.formBuilder.group({
      muId: [0, Validators.required],
      name: ['', Validators.required],
      description: '',
      quantity: [null, Validators.required],
      cost: 0
    });

    this.muSer.getAllMUs().subscribe(data => {
      if (data['status'] !== 'error') {
        this.allMus = data.map((mus: Array<Mus> = []) => Mus.fromJson(mus));
      }
    });

    this.toolSer.getAllTools().subscribe(data => {
      if (data['status'] !== 'error') {
        this.allTools = data.map((tools: Array<Tools> = []) => Tools.fromJson(tools));
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  saveTool() {
    this.toolSer.saveTool(this.formTool.value).subscribe(data => {
      if (data.status !== 'error') {
        this.toast.fire({
          icon: 'success',
          title: 'Herramienta guardada.'
        });
        this.reloadTable();
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error al guardar.'
        });
      }
      this.resetToolForm();
    });
  }

  selectMU(event: any) {
    this.formTool.patchValue({
      muId: parseInt(event.target.value)
    });
  }

  resetToolForm() {
    this.formTool.patchValue({
      muId: 0,
      name: '',
      description: '',
      quantity: 1,
      cost: 0
    });
  }

  reloadTable() {
    this.loading = true;
    this.toolSer.getAllTools().subscribe(data => {
      if (data['status'] !== 'error') {
        this.allTools = data.map((tools: Array<Tools> = []) => Tools.fromJson(tools));
      }
      this.loading = false;
    });
  }

}
