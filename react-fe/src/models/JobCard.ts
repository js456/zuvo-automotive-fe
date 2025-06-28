import { Customer } from "./customer";
import { Vehicle } from "./vehicle";
import { Service } from "./Service";
export interface JobCard {
  id: number;
  customer: Customer;
  vehicle: Vehicle;
  deliveryDate: string;
  serviceid: number[];
  service: Service[];
  comments: string;
  jobStatus: string;
}