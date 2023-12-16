import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, CompanyEnum, CompanyEnumType } from '@app/common';

@Schema({ versionKey: false })
export class DocDocument extends AbstractDocument {
  @Prop({
    type: String,
    enum: CompanyEnum,
  })
  company: CompanyEnumType;

  @Prop()
  title: string;

  @Prop()
  imageUri: string;

  @Prop()
  createdAt: Date;

  @Prop()
  originUri: string;

  @Prop({ default: 0 })
  thumbsUp?: number;

  @Prop({ default: 0 })
  thumbsDown?: number;
}

export const DocsSchema = SchemaFactory.createForClass(DocDocument);
