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
          v-model.trim="newVehicle.name"
          required="true"
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
          v-model.trim="newVehicle.gewicht"
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
          v-model.trim="newVehicle.anzahlAchsen"
          required="true"
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
          v-model.trim="newVehicle.maxGeschwindigkeit"
          required="true"
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Geschwindigkeit ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="erstzulassung">Erstzulassung</label>
        <Calendar
          dateFormat="dd.mm.yy"
          id="erstzulassung"
          v-model.trim="newVehicle.erstzulassung"
          required="true"
          :class="{ 'p-invalid': submitted && !newVehicle }"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Datum erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="fahrzeugtyp">Fahrzeugtyp</label>
        <Dropdown
          placeholder="Fahrzeugtyp wählen"
          id="fahrzeugtyp"
          v-model.trim="newVehicle.fahrzeugtyp"
          required="true"
          :class="{ 'p-invalid': submitted && !newVehicle }"
          :options="vehicleTypes"
          optionLabel="name"
          optionValue="id"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Bitte Fahrzeugtyp wählen.</small
        >
      </div>
      <div class="field">
        <label for="istFahrbereit">Fahrbereit</label>
        <Checkbox
          id="istFahrbereit"
          v-model.trim="newVehicle.istFahrbereit"
          required="true"
          :class="{ 'p-invalid': submitted && !newVehicle }"
          :binary="true"
        />
        <small class="p-invalid" v-if="submitted && !newVehicle"
          >Ist das Fahrzeug fahrbereit?</small
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
          :class="{ 'p-invalid': submitted && !vehicle }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Name ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="gewicht">Gewicht in Kg</label>
        <InputNumber
          id="gewicht"
          v-model.trim="vehicle.gewicht"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !vehicle }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Gewicht ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="anzahlAchsen">Achsen</label>
        <InputNumber
          id="anzahlAchsen"
          v-model.trim="vehicle.anzahlAchsen"
          required="true"
          :class="{ 'p-invalid': submitted && !vehicle }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Anzahl der Achsen ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="geschwindigkeit">Geschwindigkeit in Km/h</label>
        <InputNumber
          id="geschwindigkeit"
          v-model.trim="vehicle.maxGeschwindigkeit"
          required="true"
          :class="{ 'p-invalid': submitted && !vehicle }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Geschwindigkeit ist erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="erstzulassung">Erstzulassung</label>
        <Calendar
          dateFormat="dd.mm.yy"
          id="erstzulassung"
          v-model.trim="vehicle.erstzulassung"
          required="true"
          :class="{ 'p-invalid': submitted && !vehicle }"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Datum erforderlich.</small
        >
      </div>
      <div class="field">
        <label for="fahrzeugtypId">Fahrzeugtyp</label>
        <Dropdown
          placeholder="Fahrzeugtyp wählen"
          id="fahrzeugtypId"
          v-model.trim="vehicle.fahrzeugtypId"
          required="true"
          :class="{ 'p-invalid': submitted && !vehicle }"
          :options="vehicleTypes"
          optionLabel="name"
          optionValue="id"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Bitte Fahrzeugtyp wählen.</small
        >
      </div>
      <div class="field">
        <label for="istFahrbereit">Fahrbereit</label>
        <Checkbox
          id="istFahrbereit"
          v-model.trim="vehicle.istFahrbereit"
          required="true"
          :class="{ 'p-invalid': submitted && !vehicle }"
          :binary="true"
        />
        <small class="p-invalid" v-if="submitted && !vehicle"
          >Ist das Fahrzeug fahrbereit?</small
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
import Checkbox from "primevue/checkbox";
import Calendar from "primevue/calendar";
import {
  deleteVehicle,
  getVehicles,
  getVehicleTypes,
  saveVehicle,
  updateVehicle,
} from "@/lib/apiCallHelpers";
import Vehicle from "@/types/Vehicle";

interface VehiclesData {
  vehicles: Vehicle[];
  vehicleDialog: boolean;
  deleteVehicleDialog: boolean;
  newVehicleDialog: boolean;
  vehicle: any;
  submitted: boolean;
  newVehicle: any;
  vehicleTypes: [];
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
    Checkbox,
    Calendar,
  },
  data(): VehiclesData {
    return {
      vehicles: [],
      vehicleDialog: false,
      deleteVehicleDialog: false,
      newVehicleDialog: false,
      vehicle: null,
      submitted: false,
      newVehicle: null,
      vehicleTypes: [],
    };
  },
  async created() {
    const initialVehicles = await getVehicles();
    this.vehicles = initialVehicles;
    const initialVehicleTypes = await getVehicleTypes();
    this.vehicleTypes = initialVehicleTypes;
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

      await saveVehicle(this.newVehicle);
      this.vehicles = await getVehicles();
      this.newVehicleDialog = false;
    },
    async saveEditedVehicle() {
      this.submitted = true;
      // Route is n ot working?
      await updateVehicle(this.vehicle);
      this.vehicles = await getVehicles();
      this.vehicle = {};
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
      await deleteVehicle(this.vehicle);
      this.vehicles = await getVehicles();
      this.vehicle = {};
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
