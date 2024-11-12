import mongoose, { Schema } from 'mongoose';
import { IWorkspace } from './workspace.types';

const WorkspaceSchema = new Schema<IWorkspace>({
  office: { type: String, ref: 'Office', required: true },
  deskNumber: { type: Number, required: true },
  equipment: [{ type: String }],
});

export const Workspace = mongoose.model<IWorkspace>(
  'Workspace',
  WorkspaceSchema,
);
