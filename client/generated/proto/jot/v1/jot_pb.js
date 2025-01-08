// @generated by protoc-gen-es v2.2.3
// @generated from file jot/v1/jot.proto (package jot.v1, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_field_mask, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file jot/v1/jot.proto.
 */
export const file_jot_v1_jot = /*@__PURE__*/
  fileDesc("ChBqb3QvdjEvam90LnByb3RvEgZqb3QudjEiBwoFRW1wdHkiIwoDVGFnEg4KBnRhZ19pZBgBIAEoAxIMCgRuYW1lGAIgASgJIsEBCgNKb3QSDgoGam90X2lkGAEgASgDEi4KCmNyZWF0ZWRfYXQYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYAyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEg8KB2NvbnRlbnQYBCABKAkSDgoGcGlubmVkGAUgASgIEg8KB2RlbGV0ZWQYBiABKAgSGAoDdGFnGAcgASgLMgsuam90LnYxLlRhZyI0ChBDcmVhdGVKb3RSZXF1ZXN0Eg8KB3RhZ05hbWUYASABKAkSDwoHY29udGVudBgCIAEoCSIyCg9MaXN0Sm90c1JlcXVlc3QSDAoEcGFnZRgBIAEoAxIRCglwYWdlX3NpemUYAiABKAMiLQoQTGlzdEpvdHNSZXNwb25zZRIZCgRqb3RzGAEgAygLMgsuam90LnYxLkpvdCI7Cg9GaW5kVGFnc1JlcXVlc3QSGAoLc2VhcmNoX3Rlcm0YASABKAlIAIgBAUIOCgxfc2VhcmNoX3Rlcm0iLQoQRmluZFRhZ3NSZXNwb25zZRIZCgR0YWdzGAEgAygLMgsuam90LnYxLlRhZyJDChBVcGRhdGVKb3RSZXF1ZXN0Eg4KBmpvdF9pZBgBIAEoAxIOCgZwaW5uZWQYAiABKAgSDwoHZGVsZXRlZBgDIAEoCDK5AQoKSm90U2VydmljZRI0CglDcmVhdGVKb3QSGC5qb3QudjEuQ3JlYXRlSm90UmVxdWVzdBoLLmpvdC52MS5Kb3QiABI/CghMaXN0Sm90cxIXLmpvdC52MS5MaXN0Sm90c1JlcXVlc3QaGC5qb3QudjEuTGlzdEpvdHNSZXNwb25zZSIAEjQKCVVwZGF0ZUpvdBIYLmpvdC52MS5VcGRhdGVKb3RSZXF1ZXN0Ggsuam90LnYxLkpvdCIAMk0KClRhZ1NlcnZpY2USPwoIRmluZFRhZ3MSFy5qb3QudjEuRmluZFRhZ3NSZXF1ZXN0Ghguam90LnYxLkZpbmRUYWdzUmVzcG9uc2UiAEKKAQoKY29tLmpvdC52MUIISm90UHJvdG9QAVo5Z2l0aHViLmNvbS9zOTkyL2pvdC9pbnRlcm5hbC9nZW5lcmF0ZWQvcHJvdG8vam90L3YxO2pvdHYxogIDSlhYqgIGSm90LlYxygIGSm90XFYx4gISSm90XFYxXEdQQk1ldGFkYXRh6gIHSm90OjpWMWIGcHJvdG8z", [file_google_protobuf_field_mask, file_google_protobuf_timestamp]);

/**
 * Describes the message jot.v1.Empty.
 * Use `create(EmptySchema)` to create a new message.
 */
export const EmptySchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 0);

/**
 * Describes the message jot.v1.Tag.
 * Use `create(TagSchema)` to create a new message.
 */
export const TagSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 1);

/**
 * Describes the message jot.v1.Jot.
 * Use `create(JotSchema)` to create a new message.
 */
export const JotSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 2);

/**
 * Describes the message jot.v1.CreateJotRequest.
 * Use `create(CreateJotRequestSchema)` to create a new message.
 */
export const CreateJotRequestSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 3);

/**
 * Describes the message jot.v1.ListJotsRequest.
 * Use `create(ListJotsRequestSchema)` to create a new message.
 */
export const ListJotsRequestSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 4);

/**
 * Describes the message jot.v1.ListJotsResponse.
 * Use `create(ListJotsResponseSchema)` to create a new message.
 */
export const ListJotsResponseSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 5);

/**
 * Describes the message jot.v1.FindTagsRequest.
 * Use `create(FindTagsRequestSchema)` to create a new message.
 */
export const FindTagsRequestSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 6);

/**
 * Describes the message jot.v1.FindTagsResponse.
 * Use `create(FindTagsResponseSchema)` to create a new message.
 */
export const FindTagsResponseSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 7);

/**
 * Describes the message jot.v1.UpdateJotRequest.
 * Use `create(UpdateJotRequestSchema)` to create a new message.
 */
export const UpdateJotRequestSchema = /*@__PURE__*/
  messageDesc(file_jot_v1_jot, 8);

/**
 * @generated from service jot.v1.JotService
 */
export const JotService = /*@__PURE__*/
  serviceDesc(file_jot_v1_jot, 0);

/**
 * @generated from service jot.v1.TagService
 */
export const TagService = /*@__PURE__*/
  serviceDesc(file_jot_v1_jot, 1);

