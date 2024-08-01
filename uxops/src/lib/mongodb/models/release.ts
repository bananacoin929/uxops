import { model, models, Schema } from 'mongoose';

export interface IDetail {
  name: string;
  value: string;
}

interface IBody {
  contentType: string;
  content: string;
}

export interface IRelease {
  startDateTime: Date;
  endDateTime: Date;
  lastModifiedDateTime: Date;
  title: String;
  category: String;
  severity: String;
  tags: String[];
  isMajorChange: boolean;
  actionRequiredByDateTime: Date;
  services: String[];
  hasAttachments: boolean;
  viewPoint: string;
  details: IDetail[];
  body: IBody;
}
const ReleaseSchema = new Schema<IRelease>(
  {
    startDateTime: Date,
    endDateTime: Date,
    lastModifiedDateTime: Date,
    title: String,
    category: String,
    severity: String,
    tags: [String],
    isMajorChange: Boolean,
    actionRequiredByDateTime: Date,
    services: [String],
    hasAttachments: Boolean,
    viewPoint: String,
    details: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    body: {
      contentType: { type: String, required: true },
      content: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);
const Release = models.Release || model('Release', ReleaseSchema);

export default Release;
