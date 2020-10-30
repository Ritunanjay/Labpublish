<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PatientInfoDetail.aspx.cs" Inherits="LabMS.Navigation.PatientInformation.PatientInfoDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/patientinfodetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Patient Dasboard Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfpatientid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>

                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient Detail</legend>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlfilteration" class="form-control" style="width: 25%">
                                            <option value="0">Today's Patients</option>
                                            <option value="1">All Patients</option>
                                        </select>
                                        <input id="txtsearchpatient" autocomplete="off" class="form-control input-sm"
                                            placeholder=" UHID./Patient Name: " clientidmode="Static" style="width: 75%" onmouseover="select(this);" />
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <input type="button" id="btnadd" value="save" class="btn btn-success" />
                                </div>

                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient Booking List</legend>
                        <div class="col-md-12" style="overflow: scroll">
                            <table id="gvbooking" class="table table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
         <!--Modal Popup for Chief Complaint-->
     <div id="ModalPatientReceipt" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Patient Payment Detail</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Booking Receipt Detail</legend>

                        <div class="col-md-12" style="overflow: scroll; height: 550px; width: 100%">
                            <div class="form-group">
                                <table class="table table-responsive table-stripped table-bordered" id="gvbill">
                                </table>
                            </div>
                        </div>
                    </fieldset>

                </div>
                <div class="modal-footer">
                   <%-- <hr />
                    <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" id="addcompliment" value="Add New Compliment"/>--%>
                   <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
