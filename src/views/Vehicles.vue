<template>
  <div class="vehicles">
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

    <DataTable :value="vehicles" responsiveLayout="scroll">
      <Column field="name" header="Fahrzeug"></Column>
      <Column field="gewicht" header="Gewicht in Kg"></Column>
      <Column field="anzahlAchsen" header="Achsen"></Column>
      <Column
        field="maxGeschwindigkeit"
        header="Geschwindigkeit in Km/h"
      ></Column>
      <Column field="fahrzeugtyp" header="Fahrzeugtyp">
        <template #body="slotProps">
          <span>{{ slotProps.data.fahrzeugtyp.name }}</span>
        </template>
      </Column>
      <Column field="istFahrbereit" header="Fahrbereit">
        <template #body="slotProps">
          <span>{{ slotProps.data.istFahrbereit ? "🟢" : "🔴" }}</span>
        </template>
      </Column>

      <Column :styles="{ 'min-width': '8rem' }">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editVehicle(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteVehicle(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      :visible.sync="newVehicleDialog"
      :style="{ width: '450px' }"
      header="Fahrzeugtyp"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="newVehicle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Name ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="gewicht">Gewicht in Kg</label>
        <InputNumber
          id="gewicht"
          v-model.trim="newVehicle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Gewicht ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="anzahlAchsen">Achsen</label>
        <InputNumber
          id="anzahlAchsen"
          v-model.trim="newVehicle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Anzahl der Achsen ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="geschwindigkeit">Geschwindigkeit in Km/h</label>
        <InputNumber
          id="geschwindigkeit"
          v-model.trim="newVehicle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Geschwindigkeit ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="fahrzeugtyp">Fahrzeugtyp</label>
        <Dropdown
          placeholder="Fahrzeugtyp wählen"
          id="fahrzeugtyp"
          v-model.trim="newVehicle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !newVehicle }"
          :options="vehicleTypes"
          optionLabel="name"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Bitte Fahrzeugtyp wählen.</small
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
          @click="saveNewVehicle"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="vehicleDialog"
      :style="{ width: '450px' }"
      header="Fahrzeugtyp"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="vehicle.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !vehicle.name }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle.name"
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
          @click="saveEditedVehicle"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="deleteVehicleDialog"
      :styles="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="vehicle"
          >Are you sure you want to delete <b>{{ vehicle.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteVehicleDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteVehicle"
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
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import {
  deleteVehicle,
  getVehicles,
  getVehicleTypes,
  saveVehicle,
  updateVehicle,
} from "@/lib/apiCallHelpers";
import Vehicle from "@/types/Vehicle";
import VehicleType from "@/types/VehicleType";

interface VehiclesData {
  vehicles: [];
  vehicleDialog: boolean;
  deleteVehicleDialog: boolean;
  newVehicleDialog: boolean;
  vehicle: Vehicle;
  submitted: boolean;
  newVehicle: string;
  vehicleType: [];
}

export default Vue.extend({
  components: {
    DataTable,
    Column,
    Button,
    Toolbar,
    Dialog,
    InputText,
    InputNumber,
    Dropdown,
  },
  data(): VehiclesData {
    return {
      vehicles: [],
      vehicleDialog: false,
      deleteVehicleDialog: false,
      newVehicleDialog: false,
      vehicle: { name: "", id: 0 },
      submitted: false,
      newVehicle: "",
      vehicleType: [],
    };
  },
  async created() {
    const initialVehicles = await getVehicles();
    this.vehicles = initialVehicles;
    const initialVehicleTypes = await getVehicleTypes();
    this.vehicleType = initialVehicleTypes;
  },
  methods: {
    openNew() {
      this.newVehicleDialog = true;
    },
    hideDialog() {
      this.vehicleDialog = false;
      this.newVehicleDialog = false;
      this.submitted = false;
    },
    async saveNewVehicle() {
      this.submitted = true;
      const updatedVehicle = {
        name: this.newVehicle,
      };
      await saveVehicle(updatedVehicle);
      this.vehicles = await getVehicles();
      this.newVehicleDialog = false;
    },
    async saveEditedVehicle() {
      this.submitted = true;
      const updatedVehicle = {
        id: this.vehicle.id,
        name: this.vehicle.name,
      };
      // Route is n ot working?
      await updateVehicle(updatedVehicle);
      this.vehicles = await getVehicles();
      this.vehicle = { name: "", id: 0 };
      this.vehicleDialog = false;
    },
    editVehicle(presentVehicle: Vehicle) {
      this.vehicle = presentVehicle;
      this.vehicleDialog = true;
    },
    confirmDeleteVehicle(presentVehicle: Vehicle) {
      this.vehicle = presentVehicle;
      this.deleteVehicleDialog = true;
    },
    async deleteVehicle() {
      const updatedVehicle = {
        id: this.vehicle.id,
        name: this.vehicle.name,
      };
      await deleteVehicle(updatedVehicle);
      this.vehicles = await getVehicles();
      this.vehicle = { name: "", id: 0 };
      this.deleteVehicleDialog = false;
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
