﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PayrollEmployeeWorking.aspx.cs" Inherits="LabMS.Navigation.Payroll.PayrollEmployeeWorking" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <script src="<%= ResolveClientUrl("~/project_js/payrollemployeeworkingdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Employee Payroll Detail</h5>
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
                        <legend class="fieldSetLabel">Employee Payroll Information Detail</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                Employee Name<samp style="color: Red">*</samp></label>
                                <asp:HiddenField ID="hdfheadid" runat="server" ClientIDMode="static" Value="0" />
                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                  <select id="ddlemployee" class="form-control" clientidmode="Static" >
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                   Payment Detail<samp style="color: Red">*</samp></label>
                                <select id="ddlhead" class="form-control" clientidmode="Static" >
                                    </select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Amount<samp style="color: Red">*</samp></label>
                                <input id="txtamount" class="form-control" onfocus="allownumeric(this)" placeholder="Amount" value="0" clientidmode="Static" />

                            </div>
                        </div> <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                Percentage<samp style="color: Red">*</samp></label>
                                <input id="txtpercentage" class="form-control" onfocus="allownumeric(this)" placeholder="Percentage" value="" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                      <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Employee Payroll Information Detail</legend>
                   <div class="col-md-12" style="overflow:scroll">
                         <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                    </table>
                   </div>
                          </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add EmployeeWorking" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>

</asp:Content>
