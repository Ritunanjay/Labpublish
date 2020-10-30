﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="GroupDetail.aspx.cs" Inherits="ITHospital.Navigation.GeneralMaster.GroupDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/groupdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Department Group Information Detail</h5>
                    <asp:HiddenField ID="hdfgroupid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New Department Group Information</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Group Code<samp style="color: Red">*</samp></label>
                                <input id="txtcode" class="form-control" placeholder="Code" clientidmode="Static" onfocus="uppercase(this)" />

                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Group Name<samp style="color: Red">*</samp></label>
                                <input id="txtgroup" class="form-control" placeholder="Group Name" onfocus="uppercase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Department<samp style="color: Red">*</samp></label>
                                <select id="ddldepartment" class="form-control" clientidmode="Static">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <label class="control-label">
                                    Order No<samp style="color: Red"></samp></label>
                               <input id="txtorderno" class="form-control" onfocus="allownumericwithoutdecimal(this);" value="0" placeholder="Order No" clientidmode="Static" />

                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Required Sample
                                <samp style="color: Red"></samp></label>
                                <select id="ddlsamplerequired" class="form-control" clientidmode="Static">
                                    <option value="false">No Need</option>
                                    <option value="true">Required</option>
                                </select>

                            </div>
                        </div>
                         <div class="col-md-1">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    GroupType
                                <samp style="color: Red"></samp></label>
                                <select id="ddlgrouptype" class="form-control" clientidmode="Static">
                                </select>

                            </div>
                        </div>
                      
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Result Type
                                <samp style="color: Red"></samp></label>
                                <select id="ddlresulttype" class="form-control" clientidmode="Static">
                                    <option value="0">--Select--</option>
                                    <option value="WR">Word Report</option>
                                    <option value="NR">Numeric Report</option>
                                    <option value="AR">Allergy Report</option>
                                </select>

                            </div>
                        </div>

                       
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Department Group Information List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="overflow: scroll">
                            <div class="panel-body">
                                <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">
                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Department Group" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>
</asp:Content>
