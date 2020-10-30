<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="MachineDetail.aspx.cs" Inherits="ITHospital.Navigation.Machine.MachineDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/machinedetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Machine Information</h5>
                    <asp:HiddenField ID="hdfmachineid" runat="server" ClientIDMode="static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New Machine</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Machine Number<samp style="color: Red">*</samp></label>
                                <input id="txtmachinenumber" class="form-control" placeholder="Machine Number" onfocus="allownumericwithoutdecimal(this);" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Machine Code<samp style="color: Red">*</samp></label>
                                <input id="txtmachinecode" class="form-control" placeholder="Machine Code" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Machine Name<samp style="color: Red">*</samp></label>
                                <input id="txtmachinename" class="form-control" placeholder="Machine Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Machine Port<samp style="color: Red">*</samp></label>
                                <input id="txtmachineport" class="form-control" placeholder="Machine Port" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    BaurdRate<samp style="color: Red">*</samp></label>
                                <select id="ddlbaurdrate" class="form-control" clientidmode="Static">
                                    <option value="600">600</option>
                                    <option value="1200">1200</option>
                                    <option value="2400">2400</option>
                                    <option value="4800">4800</option>
                                    <option value="9600">9600</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Databits<samp style="color: Red">*</samp></label>
                                <select id="ddldatabits" class="form-control" clientidmode="Static">
                                    <option value="8">8</option>
                                    <option value="4">4</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Stopbits<samp style="color: Red">*</samp></label>
                                <select id="ddlstopbits" class="form-control" clientidmode="Static">
                                    <option value="1">one</option>
                                    <option value="2">two</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Handshake<samp style="color: Red">*</samp></label>
                                <select id="ddlhandshake" class="form-control" clientidmode="Static">
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Parity<samp style="color: Red">*</samp></label>
                                <select id="ddlparity" class="form-control" clientidmode="Static">
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IP Address<samp style="color: Red">*</samp></label>
                                <input id="txtipaddress" class="form-control" placeholder="IP Address" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Port<samp style="color: Red">*</samp></label>
                                <input id="txtport" class="form-control" placeholder="Port" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsMachine Port<samp style="color: Red">*</samp></label>
                                <select id="ddlmachineport" class="form-control" clientidmode="Static">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Comport<samp style="color: Red">*</samp></label>
                                <select id="ddltransfertype" class="form-control" clientidmode="Static">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
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
                        <legend class="fieldSetLabel">Machine List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="overflow: scroll">
                            <div class="panel-body" style="overflow-x: scroll">
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

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add Machine" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>

</asp:Content>
