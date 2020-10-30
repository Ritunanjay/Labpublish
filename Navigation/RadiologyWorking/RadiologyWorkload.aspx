<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="RadiologyWorkload.aspx.cs" Inherits="LabMS.Navigation.RadiologyWorking.RadiologyWorkload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <script src="<%= ResolveClientUrl("~/project_js/radiologyworkload.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Radiology Workload Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdforderid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            
            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Filter Detail</legend>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Other Search Detail</label>
                                <input id="txtpatientfilter" placeholder=" Advance Search Here" class="form-control" />
                            </div>
                        </div>
                       
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Radiology Workload Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: auto; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvradiologyreporting">
                                </table>
                            </div>
                        </div>
                    </fieldset>


                </div>
                <div class="col-md-12 fixbuttonsectionbuttom" style="display:none">
                    <div class="col-md-12 text-center">
                        <%--   <input type="button" id="btnadd" accesskey="S" class="btn btnsubmitreset btn-xs" value="Arrived" />
                        <input type="button" id="btnreset" accesskey="R" class="btn btnsubmitreset btn-xs" value="Refresh" />
                        --%>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="ModalRadiologyResult" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                &times;</button>
                            <h4 class="modal-title">Report Details</h4>
                        </div>
                        <div class="modal-body col-md-12">
                            <div class="box-danger">
                                <asp:Button ID="btnPrint2" CssClass="btn btn-danger btn-xs" runat="server" Text="Print"
                                    data-dismiss="modal" CausesValidation="False" OnClientClick="return PrintDivRadiology();"></asp:Button>
                                <div id="gvreport">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <hr />
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
    </asp:Content>