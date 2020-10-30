<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="ConsultationRegistration.aspx.cs" Inherits="ITHospital.Navigation.RegistrationDetail.ConsultationRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/consultantregistration.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Consultant Registration Detail</h5>
                    <asp:HiddenField ID="hdfconsultantid" runat="server" ClientIDMode="static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New Consultant</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Centre/Franhise<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlcentre" class="form-control" clientidmode="Static" style="width: 100%">
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Department<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddldepartment" class="form-control" clientidmode="Static" style="width: 100%">
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Code/Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtcode" onfocus="uppercase(this);" class="form-control" placeholder="Code" clientidmode="Static" style="width: 30%" />
                                        <input id="txtconsultantname" onfocus="titlecase(this);" class="form-control" placeholder="Consultant Name" clientidmode="Static" style="width: 70%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Specialization<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlspecialization" class="form-control" clientidmode="Static" style="width: 100%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    Mobile/Contact/EmailID<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtmobile" class="form-control" maxlength="10" onfocus="allownumericwithoutdecimal(this);" placeholder="Mobile" clientidmode="Static" style="width: 33%" />
                                        <input id="txtresidencecontact" class="form-control" maxlength="10" onfocus="allownumericwithoutdecimal(this);" placeholder="Residence Contact" clientidmode="Static" style="width: 33%" />
                                        <input id="txtemailid" class="form-control" maxlength="150" placeholder="EmailID" clientidmode="Static" style="width: 34%" />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    State/City/Area<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlstate" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                        <select id="ddlcity" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                        <select id="ddlarea" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Type<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlconsultanttype" class="form-control" clientidmode="Static" style="width: 100%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                           <div class="col-md-3" style="">
                            <div class="form-group">
                                <label class="control-label">
                                    Account Post/Type<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlaccountpost" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        <select id="ddlaccounttype" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="0">Percentage</option>
                                            <option value="1">Doctor RateList</option>
                                        </select>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Qualification<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtqualification" maxlength="100" class="form-control" placeholder="Qualification" clientidmode="Static" style="width: 100%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    LicenseNo<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtlicenseno" maxlength="50" class="form-control" placeholder="License No" clientidmode="Static" style="width: 100%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Clinic Phone No<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtclinicnumber" class="form-control" maxlength="10" onfocus="allownumericwithoutdecimal(this);" placeholder="Clinic Phone No" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    SMS Mobile<samp style="color: Red"></samp></label>
                                        <input id="txtsmsmobile" maxlength="10" onfocus="allownumericwithoutdecimal(this);" class="form-control" placeholder="SMS Mobile" clientidmode="Static" />
                             </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Address<samp style="color: Red"></samp></label>
                                <input id="txtaddress" class="form-control" placeholder="Address" clientidmode="Static" />

                            </div>
                        </div>
                      
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    IPD Consultant<samp style="color: Red"></samp></label>
                                <select id="ddlipdconsultant" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    Valid Days<samp style="color: Red"></samp></label>
                                <input id="txtvaliddays" class="form-control" value="0" placeholder="  Valid Days" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    Number of Visit<samp style="color: Red"></samp></label>
                                <input id="txtvisitno" class="form-control" value="0" placeholder="Number of Visit" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    Room No<samp style="color: Red"></samp></label>
                                <input id="txtroomno" class="form-control" value="0" placeholder="RoomNo" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    OPD Limit<samp style="color: Red"></samp></label>
                                <input id="txtopdlimit" class="form-control" value="0" placeholder="OPD Limit" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3" style="display: none">
                            <div class="form-group">
                                <label class="control-label">
                                    IPD Show on Bill<samp style="color: Red"></samp></label>
                                <select id="ddlipdshowonbill" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Outside Consultant<samp style="color: Red"></samp></label>
                                <select id="ddlopdconsultant" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                   Reporting Consultant<samp style="color: Red"></samp></label>
                                <select id="ddlotconsultant" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsRateList<samp style="color: Red"></samp></label>
                                <select id="ddlratelist" class="form-control" clientidmode="Static">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red"></samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Photo/Sign<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                      <select id="ddlallowsign" class="form-control" clientidmode="Static" style="width: 30%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>    <input id="filephoto" class="form-control" type="file" clientidmode="Static" style="width: 50%; display: none" />
                                        <input id="filesign" class="form-control" type="file" class="form-control" clientidmode="Static" style="width: 50%" />
                                        <button type="button" id="btnfilesign" class="btn btn-warning btn-xs btn-anim" style="width: 20%"><i class="icon-rocket"></i><span class="btn-text">upload</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Consultant Detail List</legend>
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

                <input type="button" id="btnadd" class="btn  btn-success btn-xs" value="Add New Consultant" accesskey="A" />
                <input type="button" id="btnclear" class="btn  btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->
     <div id="ModalDoctorCompliment" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Add Doctor Compliment Here</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add Doctor Compliment Detail</legend>
                         <div class="col-md-12">
                            <table id="gvcompliment" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                        </div>
                     
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <hr />
                    <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" id="addcompliment" value="Add New Compliment"/>
                   <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>

