<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="StudentRecordDetail.aspx.cs" Inherits="LabMS.Navigation.SchoolRegistration.StudentRecordDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="<%= ResolveClientUrl("~/school_js/studentrecordinfo.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Student Registration Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfstudentid" Value="0" runat="server" ClientIDMode="Static" />
                        <asp:HiddenField ID="hdfrecordid" Value="0" runat="server" ClientIDMode="Static" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%; height: auto;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">

                    <div class="col-md-12 searchoptiondiv">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Search Options</legend>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <select id="ddlfilteration" class="form-control">
                                        <option value="0">Today's  Student</option>
                                        <option value="1">All Student</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="form-group">
                                    <input id="txtsearchstudent" autocomplete="off" class="form-control input-sm"
                                        placeholder=" UHID./Student Name: " clientidmode="Static" />
                                </div>
                            </div>
                        </fieldset>

                    </div>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Student Information Updation</legend>
                        <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Class</label>
                                    <select id="ddlclass" class="form-control"  clientidmode="static" ></select>
                                  
                                </div>
                            </div>
                        <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Section</label>
                                      <select id="ddlsection" class="form-control" clientidmode="static" ></select>

                                </div>
                            </div>
                          <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        To Date</label>
                                    <input id="txtfromdate" class="form-control" readonly />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        From Date</label>
                                    <input id="txttodate" class="form-control" readonly />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Other Search Detail</label>
                                    <input id="txtstudentfilter" placeholder=" Advance Search Here" class="form-control" />
                                </div>
                            </div>
                    </fieldset>
                  
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Student Record List</legend>
                            <div class="col-md-12" style="overflow: scroll">
                                <table id="gvstudent" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>
                        </fieldset>
                </div>
            </div>
            <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add student" />
                        <input type="button" id="btndelete" accesskey="D" class="btn btn-danger  btn-xs" value="Delete" style="display: none" />
                        <input type="button" id="btnreset" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
                        <input type="button" id="btnadvancesearch" accesskey="S" class="btn btn-info btn-xs" value="Advance Search" />
                    </div>
                </div>
        </div>
    </div>
</asp:Content>
