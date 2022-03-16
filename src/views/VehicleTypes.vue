<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button
          label="New"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openNew"
        />
      </template>
    </Toolbar>
    <DataTable :value="vehicleTypes" responsiveLayout="scroll">
      <Column field="name" header="Fahrzeugtyp"></Column>
      <Column :styles="{ 'min-width': '8rem' }">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editVehicleType(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteVehicleType(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      :visible.sync="newTypeDialog"
      :style="{ width: '450px' }"
      header="Fahrzeugtyp"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="newVehicleType"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicleType }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicleType"
          >Name is required.</small
        >
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveNewType"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="typeDialog"
      :style="{ width: '450px' }"
      header="Fahrzeugtyp"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="vehicleType.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !vehicleType.name }"
        />
        <small class="p-invalid" v-if="submitted && !vehicleType.name"
          >Name is required.</small
        >
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveEditedType"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="deleteTypeDialog"
      :styles="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="vehicleType"
          >Are you sure you want to delete <b>{{ vehicleType.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteTypeDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteType"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {
  deleteVehicleType,
  getVehicleTypes,
  saveVehicleType,
  updateVehicleType,
} from "@/lib/apiCallHelpers";
import VehicleType from "@/types/VehicleType";

interface VehicleTypesData {
  vehicleTypes: [];
  typeDialog: boolean;
  deleteTypeDialog: boolean;
  newTypeDialog: boolean;
  vehicleType: VehicleType;
  submitted: boolean;
  newVehicleType: string;
}

export default Vue.extend({
  components: { DataTable, Column, Button, Toolbar, Dialog, InputText },
  data(): VehicleTypesData {
    return {
      vehicleTypes: [],
      typeDialog: false,
      deleteTypeDialog: false,
      newTypeDialog: false,
      vehicleType: { name: "", id: 0 },
      submitted: false,
      newVehicleType: "",
    };
  },
  async created() {
    const initialVehicleTypes = await getVehicleTypes();
    this.vehicleTypes = initialVehicleTypes;
  },
  methods: {
    openNew() {
      this.newTypeDialog = true;
    },
    hideDialog() {
      this.typeDialog = false;
      this.newTypeDialog = false;
      this.submitted = false;
    },
    async saveNewType() {
      this.submitted = true;
      const updatedVehicleType = {
        name: this.newVehicleType,
      };
      await saveVehicleType(updatedVehicleType);
      this.vehicleTypes = await getVehicleTypes();
      this.newTypeDialog = false;
    },
    async saveEditedType() {
      this.submitted = true;
      const updatedVehicleType = {
        id: this.vehicleType.id,
        name: this.vehicleType.name,
      };
      // Route is n ot working?
      await updateVehicleType(updatedVehicleType);
      this.vehicleTypes = await getVehicleTypes();
      this.vehicleType = { name: "", id: 0 };
      this.typeDialog = false;
    },
    editVehicleType(presentVehicleType: VehicleType) {
      this.vehicleType = presentVehicleType;
      this.typeDialog = true;
    },
    confirmDeleteVehicleType(presentVehicleType: VehicleType) {
      this.vehicleType = presentVehicleType;
      this.deleteTypeDialog = true;
    },
    async deleteType() {
      const updatedVehicleType = {
        id: this.vehicleType.id,
        name: this.vehicleType.name,
      };
      await deleteVehicleType(updatedVehicleType);
      this.vehicleTypes = await getVehicleTypes();
      this.vehicleType = { name: "", id: 0 };
      this.deleteTypeDialog = false;
    },
  },
});
</script>

<style>
table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 150px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
