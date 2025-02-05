// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.1
// 	protoc        (unknown)
// source: jot/v1/jot.proto

package jotv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	_ "google.golang.org/protobuf/types/known/fieldmaskpb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Empty struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Empty) Reset() {
	*x = Empty{}
	mi := &file_jot_v1_jot_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Empty) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Empty) ProtoMessage() {}

func (x *Empty) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Empty.ProtoReflect.Descriptor instead.
func (*Empty) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{0}
}

type Tag struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	TagId         int64                  `protobuf:"varint,1,opt,name=tag_id,json=tagId,proto3" json:"tag_id,omitempty"`
	Name          string                 `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Tag) Reset() {
	*x = Tag{}
	mi := &file_jot_v1_jot_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Tag) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Tag) ProtoMessage() {}

func (x *Tag) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Tag.ProtoReflect.Descriptor instead.
func (*Tag) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{1}
}

func (x *Tag) GetTagId() int64 {
	if x != nil {
		return x.TagId
	}
	return 0
}

func (x *Tag) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type Jot struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	JotId         int64                  `protobuf:"varint,1,opt,name=jot_id,json=jotId,proto3" json:"jot_id,omitempty"`
	CreatedAt     *timestamppb.Timestamp `protobuf:"bytes,2,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt     *timestamppb.Timestamp `protobuf:"bytes,3,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	Content       string                 `protobuf:"bytes,4,opt,name=content,proto3" json:"content,omitempty"`
	Pinned        bool                   `protobuf:"varint,5,opt,name=pinned,proto3" json:"pinned,omitempty"`
	Deleted       bool                   `protobuf:"varint,6,opt,name=deleted,proto3" json:"deleted,omitempty"`
	Tag           *Tag                   `protobuf:"bytes,7,opt,name=tag,proto3" json:"tag,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Jot) Reset() {
	*x = Jot{}
	mi := &file_jot_v1_jot_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Jot) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Jot) ProtoMessage() {}

func (x *Jot) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Jot.ProtoReflect.Descriptor instead.
func (*Jot) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{2}
}

func (x *Jot) GetJotId() int64 {
	if x != nil {
		return x.JotId
	}
	return 0
}

func (x *Jot) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *Jot) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

func (x *Jot) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

func (x *Jot) GetPinned() bool {
	if x != nil {
		return x.Pinned
	}
	return false
}

func (x *Jot) GetDeleted() bool {
	if x != nil {
		return x.Deleted
	}
	return false
}

func (x *Jot) GetTag() *Tag {
	if x != nil {
		return x.Tag
	}
	return nil
}

type CreateJotRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	TagName       string                 `protobuf:"bytes,1,opt,name=tagName,proto3" json:"tagName,omitempty"`
	Content       string                 `protobuf:"bytes,2,opt,name=content,proto3" json:"content,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *CreateJotRequest) Reset() {
	*x = CreateJotRequest{}
	mi := &file_jot_v1_jot_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *CreateJotRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateJotRequest) ProtoMessage() {}

func (x *CreateJotRequest) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateJotRequest.ProtoReflect.Descriptor instead.
func (*CreateJotRequest) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{3}
}

func (x *CreateJotRequest) GetTagName() string {
	if x != nil {
		return x.TagName
	}
	return ""
}

func (x *CreateJotRequest) GetContent() string {
	if x != nil {
		return x.Content
	}
	return ""
}

type ListJotsRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Page          int64                  `protobuf:"varint,1,opt,name=page,proto3" json:"page,omitempty"`
	PageSize      int64                  `protobuf:"varint,2,opt,name=page_size,json=pageSize,proto3" json:"page_size,omitempty"`
	SearchTerm    *string                `protobuf:"bytes,3,opt,name=search_term,json=searchTerm,proto3,oneof" json:"search_term,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *ListJotsRequest) Reset() {
	*x = ListJotsRequest{}
	mi := &file_jot_v1_jot_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ListJotsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListJotsRequest) ProtoMessage() {}

func (x *ListJotsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListJotsRequest.ProtoReflect.Descriptor instead.
func (*ListJotsRequest) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{4}
}

func (x *ListJotsRequest) GetPage() int64 {
	if x != nil {
		return x.Page
	}
	return 0
}

func (x *ListJotsRequest) GetPageSize() int64 {
	if x != nil {
		return x.PageSize
	}
	return 0
}

func (x *ListJotsRequest) GetSearchTerm() string {
	if x != nil && x.SearchTerm != nil {
		return *x.SearchTerm
	}
	return ""
}

type ListJotsResponse struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Jots          []*Jot                 `protobuf:"bytes,1,rep,name=jots,proto3" json:"jots,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *ListJotsResponse) Reset() {
	*x = ListJotsResponse{}
	mi := &file_jot_v1_jot_proto_msgTypes[5]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ListJotsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListJotsResponse) ProtoMessage() {}

func (x *ListJotsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[5]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListJotsResponse.ProtoReflect.Descriptor instead.
func (*ListJotsResponse) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{5}
}

func (x *ListJotsResponse) GetJots() []*Jot {
	if x != nil {
		return x.Jots
	}
	return nil
}

type FindTagsRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	SearchTerm    *string                `protobuf:"bytes,1,opt,name=search_term,json=searchTerm,proto3,oneof" json:"search_term,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FindTagsRequest) Reset() {
	*x = FindTagsRequest{}
	mi := &file_jot_v1_jot_proto_msgTypes[6]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FindTagsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FindTagsRequest) ProtoMessage() {}

func (x *FindTagsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[6]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FindTagsRequest.ProtoReflect.Descriptor instead.
func (*FindTagsRequest) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{6}
}

func (x *FindTagsRequest) GetSearchTerm() string {
	if x != nil && x.SearchTerm != nil {
		return *x.SearchTerm
	}
	return ""
}

type FindTagsResponse struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Tags          []*Tag                 `protobuf:"bytes,1,rep,name=tags,proto3" json:"tags,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FindTagsResponse) Reset() {
	*x = FindTagsResponse{}
	mi := &file_jot_v1_jot_proto_msgTypes[7]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FindTagsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FindTagsResponse) ProtoMessage() {}

func (x *FindTagsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[7]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FindTagsResponse.ProtoReflect.Descriptor instead.
func (*FindTagsResponse) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{7}
}

func (x *FindTagsResponse) GetTags() []*Tag {
	if x != nil {
		return x.Tags
	}
	return nil
}

type UpdateJotRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	JotId         int64                  `protobuf:"varint,1,opt,name=jot_id,json=jotId,proto3" json:"jot_id,omitempty"`
	Pinned        bool                   `protobuf:"varint,2,opt,name=pinned,proto3" json:"pinned,omitempty"`
	Deleted       bool                   `protobuf:"varint,3,opt,name=deleted,proto3" json:"deleted,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *UpdateJotRequest) Reset() {
	*x = UpdateJotRequest{}
	mi := &file_jot_v1_jot_proto_msgTypes[8]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *UpdateJotRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateJotRequest) ProtoMessage() {}

func (x *UpdateJotRequest) ProtoReflect() protoreflect.Message {
	mi := &file_jot_v1_jot_proto_msgTypes[8]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateJotRequest.ProtoReflect.Descriptor instead.
func (*UpdateJotRequest) Descriptor() ([]byte, []int) {
	return file_jot_v1_jot_proto_rawDescGZIP(), []int{8}
}

func (x *UpdateJotRequest) GetJotId() int64 {
	if x != nil {
		return x.JotId
	}
	return 0
}

func (x *UpdateJotRequest) GetPinned() bool {
	if x != nil {
		return x.Pinned
	}
	return false
}

func (x *UpdateJotRequest) GetDeleted() bool {
	if x != nil {
		return x.Deleted
	}
	return false
}

var File_jot_v1_jot_proto protoreflect.FileDescriptor

var file_jot_v1_jot_proto_rawDesc = []byte{
	0x0a, 0x10, 0x6a, 0x6f, 0x74, 0x2f, 0x76, 0x31, 0x2f, 0x6a, 0x6f, 0x74, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x06, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x1a, 0x20, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x66, 0x69, 0x65, 0x6c,
	0x64, 0x5f, 0x6d, 0x61, 0x73, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69,
	0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x07, 0x0a,
	0x05, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22, 0x30, 0x0a, 0x03, 0x54, 0x61, 0x67, 0x12, 0x15, 0x0a,
	0x06, 0x74, 0x61, 0x67, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x74,
	0x61, 0x67, 0x49, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0xfd, 0x01, 0x0a, 0x03, 0x4a, 0x6f, 0x74,
	0x12, 0x15, 0x0a, 0x06, 0x6a, 0x6f, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03,
	0x52, 0x05, 0x6a, 0x6f, 0x74, 0x49, 0x64, 0x12, 0x39, 0x0a, 0x0a, 0x63, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69,
	0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64,
	0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74,
	0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61,
	0x6d, 0x70, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x18, 0x0a,
	0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x70, 0x69, 0x6e, 0x6e, 0x65,
	0x64, 0x18, 0x05, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x70, 0x69, 0x6e, 0x6e, 0x65, 0x64, 0x12,
	0x18, 0x0a, 0x07, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x18, 0x06, 0x20, 0x01, 0x28, 0x08,
	0x52, 0x07, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x12, 0x1d, 0x0a, 0x03, 0x74, 0x61, 0x67,
	0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e,
	0x54, 0x61, 0x67, 0x52, 0x03, 0x74, 0x61, 0x67, 0x22, 0x46, 0x0a, 0x10, 0x43, 0x72, 0x65, 0x61,
	0x74, 0x65, 0x4a, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07,
	0x74, 0x61, 0x67, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x74,
	0x61, 0x67, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74,
	0x22, 0x78, 0x0a, 0x0f, 0x4c, 0x69, 0x73, 0x74, 0x4a, 0x6f, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x61, 0x67, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x04, 0x70, 0x61, 0x67, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x70, 0x61, 0x67, 0x65, 0x5f,
	0x73, 0x69, 0x7a, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x70, 0x61, 0x67, 0x65,
	0x53, 0x69, 0x7a, 0x65, 0x12, 0x24, 0x0a, 0x0b, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x74,
	0x65, 0x72, 0x6d, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x0a, 0x73, 0x65, 0x61,
	0x72, 0x63, 0x68, 0x54, 0x65, 0x72, 0x6d, 0x88, 0x01, 0x01, 0x42, 0x0e, 0x0a, 0x0c, 0x5f, 0x73,
	0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x74, 0x65, 0x72, 0x6d, 0x22, 0x33, 0x0a, 0x10, 0x4c, 0x69,
	0x73, 0x74, 0x4a, 0x6f, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1f,
	0x0a, 0x04, 0x6a, 0x6f, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x6a,
	0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x4a, 0x6f, 0x74, 0x52, 0x04, 0x6a, 0x6f, 0x74, 0x73, 0x22,
	0x47, 0x0a, 0x0f, 0x46, 0x69, 0x6e, 0x64, 0x54, 0x61, 0x67, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x24, 0x0a, 0x0b, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x74, 0x65, 0x72,
	0x6d, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x0a, 0x73, 0x65, 0x61, 0x72, 0x63,
	0x68, 0x54, 0x65, 0x72, 0x6d, 0x88, 0x01, 0x01, 0x42, 0x0e, 0x0a, 0x0c, 0x5f, 0x73, 0x65, 0x61,
	0x72, 0x63, 0x68, 0x5f, 0x74, 0x65, 0x72, 0x6d, 0x22, 0x33, 0x0a, 0x10, 0x46, 0x69, 0x6e, 0x64,
	0x54, 0x61, 0x67, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1f, 0x0a, 0x04,
	0x74, 0x61, 0x67, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x6a, 0x6f, 0x74,
	0x2e, 0x76, 0x31, 0x2e, 0x54, 0x61, 0x67, 0x52, 0x04, 0x74, 0x61, 0x67, 0x73, 0x22, 0x5b, 0x0a,
	0x10, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x4a, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x15, 0x0a, 0x06, 0x6a, 0x6f, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x05, 0x6a, 0x6f, 0x74, 0x49, 0x64, 0x12, 0x16, 0x0a, 0x06, 0x70, 0x69, 0x6e, 0x6e,
	0x65, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x70, 0x69, 0x6e, 0x6e, 0x65, 0x64,
	0x12, 0x18, 0x0a, 0x07, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x07, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x32, 0xb9, 0x01, 0x0a, 0x0a, 0x4a,
	0x6f, 0x74, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x34, 0x0a, 0x09, 0x43, 0x72, 0x65,
	0x61, 0x74, 0x65, 0x4a, 0x6f, 0x74, 0x12, 0x18, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e,
	0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x4a, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x0b, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x4a, 0x6f, 0x74, 0x22, 0x00, 0x12,
	0x3f, 0x0a, 0x08, 0x4c, 0x69, 0x73, 0x74, 0x4a, 0x6f, 0x74, 0x73, 0x12, 0x17, 0x2e, 0x6a, 0x6f,
	0x74, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x4a, 0x6f, 0x74, 0x73, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x18, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69,
	0x73, 0x74, 0x4a, 0x6f, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00,
	0x12, 0x34, 0x0a, 0x09, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x4a, 0x6f, 0x74, 0x12, 0x18, 0x2e,
	0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x4a, 0x6f, 0x74,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0b, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31,
	0x2e, 0x4a, 0x6f, 0x74, 0x22, 0x00, 0x32, 0x4d, 0x0a, 0x0a, 0x54, 0x61, 0x67, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x3f, 0x0a, 0x08, 0x46, 0x69, 0x6e, 0x64, 0x54, 0x61, 0x67, 0x73,
	0x12, 0x17, 0x2e, 0x6a, 0x6f, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x46, 0x69, 0x6e, 0x64, 0x54, 0x61,
	0x67, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x18, 0x2e, 0x6a, 0x6f, 0x74, 0x2e,
	0x76, 0x31, 0x2e, 0x46, 0x69, 0x6e, 0x64, 0x54, 0x61, 0x67, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x8a, 0x01, 0x0a, 0x0a, 0x63, 0x6f, 0x6d, 0x2e, 0x6a, 0x6f,
	0x74, 0x2e, 0x76, 0x31, 0x42, 0x08, 0x4a, 0x6f, 0x74, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x39, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x73, 0x39, 0x39,
	0x32, 0x2f, 0x6a, 0x6f, 0x74, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x67,
	0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6a,
	0x6f, 0x74, 0x2f, 0x76, 0x31, 0x3b, 0x6a, 0x6f, 0x74, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x4a, 0x58,
	0x58, 0xaa, 0x02, 0x06, 0x4a, 0x6f, 0x74, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x06, 0x4a, 0x6f, 0x74,
	0x5c, 0x56, 0x31, 0xe2, 0x02, 0x12, 0x4a, 0x6f, 0x74, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42,
	0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x07, 0x4a, 0x6f, 0x74, 0x3a, 0x3a,
	0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_jot_v1_jot_proto_rawDescOnce sync.Once
	file_jot_v1_jot_proto_rawDescData = file_jot_v1_jot_proto_rawDesc
)

func file_jot_v1_jot_proto_rawDescGZIP() []byte {
	file_jot_v1_jot_proto_rawDescOnce.Do(func() {
		file_jot_v1_jot_proto_rawDescData = protoimpl.X.CompressGZIP(file_jot_v1_jot_proto_rawDescData)
	})
	return file_jot_v1_jot_proto_rawDescData
}

var file_jot_v1_jot_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_jot_v1_jot_proto_goTypes = []any{
	(*Empty)(nil),                 // 0: jot.v1.Empty
	(*Tag)(nil),                   // 1: jot.v1.Tag
	(*Jot)(nil),                   // 2: jot.v1.Jot
	(*CreateJotRequest)(nil),      // 3: jot.v1.CreateJotRequest
	(*ListJotsRequest)(nil),       // 4: jot.v1.ListJotsRequest
	(*ListJotsResponse)(nil),      // 5: jot.v1.ListJotsResponse
	(*FindTagsRequest)(nil),       // 6: jot.v1.FindTagsRequest
	(*FindTagsResponse)(nil),      // 7: jot.v1.FindTagsResponse
	(*UpdateJotRequest)(nil),      // 8: jot.v1.UpdateJotRequest
	(*timestamppb.Timestamp)(nil), // 9: google.protobuf.Timestamp
}
var file_jot_v1_jot_proto_depIdxs = []int32{
	9, // 0: jot.v1.Jot.created_at:type_name -> google.protobuf.Timestamp
	9, // 1: jot.v1.Jot.updated_at:type_name -> google.protobuf.Timestamp
	1, // 2: jot.v1.Jot.tag:type_name -> jot.v1.Tag
	2, // 3: jot.v1.ListJotsResponse.jots:type_name -> jot.v1.Jot
	1, // 4: jot.v1.FindTagsResponse.tags:type_name -> jot.v1.Tag
	3, // 5: jot.v1.JotService.CreateJot:input_type -> jot.v1.CreateJotRequest
	4, // 6: jot.v1.JotService.ListJots:input_type -> jot.v1.ListJotsRequest
	8, // 7: jot.v1.JotService.UpdateJot:input_type -> jot.v1.UpdateJotRequest
	6, // 8: jot.v1.TagService.FindTags:input_type -> jot.v1.FindTagsRequest
	2, // 9: jot.v1.JotService.CreateJot:output_type -> jot.v1.Jot
	5, // 10: jot.v1.JotService.ListJots:output_type -> jot.v1.ListJotsResponse
	2, // 11: jot.v1.JotService.UpdateJot:output_type -> jot.v1.Jot
	7, // 12: jot.v1.TagService.FindTags:output_type -> jot.v1.FindTagsResponse
	9, // [9:13] is the sub-list for method output_type
	5, // [5:9] is the sub-list for method input_type
	5, // [5:5] is the sub-list for extension type_name
	5, // [5:5] is the sub-list for extension extendee
	0, // [0:5] is the sub-list for field type_name
}

func init() { file_jot_v1_jot_proto_init() }
func file_jot_v1_jot_proto_init() {
	if File_jot_v1_jot_proto != nil {
		return
	}
	file_jot_v1_jot_proto_msgTypes[4].OneofWrappers = []any{}
	file_jot_v1_jot_proto_msgTypes[6].OneofWrappers = []any{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_jot_v1_jot_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   2,
		},
		GoTypes:           file_jot_v1_jot_proto_goTypes,
		DependencyIndexes: file_jot_v1_jot_proto_depIdxs,
		MessageInfos:      file_jot_v1_jot_proto_msgTypes,
	}.Build()
	File_jot_v1_jot_proto = out.File
	file_jot_v1_jot_proto_rawDesc = nil
	file_jot_v1_jot_proto_goTypes = nil
	file_jot_v1_jot_proto_depIdxs = nil
}
