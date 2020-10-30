<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="DirectPatientregistration.aspx.cs" Inherits="ITHospital.Navigation.RegistrationDetail.DirectPatientregistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/directpatientregistration.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Direct Patient Registration </div>
                        <div class="div_mainpt_icon_ptname" id="lnkname"></div>
                        <div class="div_mainpt_icon_ptname1" id="lnkuhid"></div>
                        <div class="div_mainpt_icon_ptname1_hide1024" id="lnkpatientdetail"></div>
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Search Options</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <select id="ddlfilteration" class="form-control select2">
                                    <option value="0">Today's  Patients</option>
                                    <option value="1">All Patients</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <asp:HiddenField ID="hdfpatientid" Value="0" runat="server" ClientIDMode="Static" />
                                <asp:HiddenField ID="hdfrecordid" Value="0" runat="server" ClientIDMode="Static" />
                                <input id="txtsearchpatient" autocomplete="off" class="form-control input-sm"
                                    placeholder=" UHID./Patient Name: " clientidmode="Static" />
                            </div>
                        </div>
                    </fieldset>

                    <%--BASIC INFORMATION--%>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">PATIENT DETAIL INFORMATION</legend>
                        <div class="col-md-1" style="display: none">
                            <img id="patientpic" class="img img-thumbnail" alt="Patient Image"
                                src="../../userImage/doctor.png" style="max-width: 141%; height: 117px" />
                            <input type="file" id="filepatientphoto" class="form-control" />
                        </div>
                        <div class="col-md-4">
                            <label class="control-label ">
                                Patient Name<samp style="color: Red">*</samp></label>
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                    <select id="ddltitle" class="form-control" style="width: 20%;">
                                    </select>
                                    <input id="txtpatientname" clientidmode="Static" class="form-control input-sm" placeholder="Enter First Name"
                                        style="width: 60%;" onfocus="titlecase(this)" />
                                    <select id="ddlgender" class="form-control" style="width: 20%;">
                                        <option value="0">Choose</option>
                                        <option value="M">MALE</option>
                                        <option value="F">FEMALE</option>
                                        <option value="O">OTHER</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Age<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtyear" class="form-control input-sm" placeholder="Y" clientidmode="Static"
                                            style="width: 33%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />
                                        <input id="txtmonth" class="form-control input-sm" placeholder="M" clientidmode="Static"
                                            style="width: 33%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />
                                        <input id="txtday" class="form-control input-sm" placeholder="D" clientidmode="Static"
                                            style="width: 33%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="control-label ">
                                Guardian Name<samp style="color: Red">*</samp></label>
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <select id="ddlguardianrelation" class="form-control" style="width: 20%;">
                                    </select>
                                    <select id="ddlguardiantitle" class="form-control" style="width: 20%;">
                                    </select>
                                    <input type="text" id="txtguardianname" class="form-control input-sm" placeholder="Enter Guardian Name"
                                        style="width: 60%;" onfocus="titlecase(this)" />

                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Mobile Number<samp style="color: Red">*</samp></label>
                                <input id="txtmobilenumber" class="form-control input-sm"
                                    placeholder="+91 9999999999" maxlength="10" onfocus="allownumericwithoutdecimal(this)" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Email</label>
                                <input id="txtemail" class="form-control input-sm" clientidmode="Static" placeholder="info@gmail.com" onfocus="select(this)" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    ID Type</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlidtype" class="form-control" style="width: 50%;">
                                        </select>
                                        <input id="txtidno" class="form-control input-sm" placeholder="Enter ID No"
                                            style="width: 50%;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Caste/Religion</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlcaste" class="form-control" style="width: 50%;">
                                        </select>
                                        <select id="ddlreligion" class="form-control" style="width: 50%;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Martial Status/Blood Group</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlmartialstatus" class="form-control" style="width: 50%;">
                                        </select>
                                        <select id="ddlbloodgroup" class="form-control" style="width: 50%;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    DOB</label>
                                <input id="txtdob" class="form-control input-sm" tabindex="-1" readonly placeholder="DOB(dd/MM/yyyy)" clientidmode="static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Occupation/Nationality</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddloccupation" class="form-control" style="width: 50%">
                                        </select>
                                        <select id="ddlnationality" class="form-control" style="width: 50%">
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Registration Date</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtregdate" readonly class="form-control input-sm"
                                            placeholder="DD/MM/YYYY" tabindex="-1" style="width: 50%" />
                                        <input id="txtremark" class="form-control input-sm"
                                            placeholder="Remark" maxlength="500" onfocus="titlecase(this)" style="width: 50%" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    UHID  
                                    <samp style="color: Red"></samp>
                                </label>
                                <input id="txtuhid" class="form-control input-sm"
                                    placeholder="UHID" readonly />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Address & Other Details</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Centre/Franchise
                                    <samp style="color: Red"></samp>
                                </label>
                                <select id="ddlcentre" class="form-control">
                                </select>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Physician 
                                    <samp style="color: Red"></samp>
                                </label>
                                <select id="ddldoctor" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Patient Category<samp style="color: Red"></samp></label>
                                <select id="ddlpatientcategory" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    TPA Sponser<samp style="color: Red"></samp></label>
                                <select id="ddltpasponser" class="form-control">
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Person Name 
                                            <samp style="color: Red"></samp>
                                </label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtcarename" class="form-control input-sm"
                                            placeholder="Person Name" maxlength="500" onfocus="titlecase(this)" style="width: 50%" />
                                        <input id="txtemergencymobile" class="form-control input-sm"
                                            placeholder="+919999999999" maxlength="10" onfocus="allownumericwithoutdecimal(this)" style="width: 50%" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label ">
                                    State/City/Area</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlstate" class="form-control" style="width: 33%"></select>
                                        <select id="ddlcity" class="form-control" style="width: 33%"></select>
                                        <select id="ddlarea" class="form-control" style="width: 34%">
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label ">
                                    Pincode/Address
                             <samp style="color: Red"></samp>
                                </label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtpincode" class="form-control input-sm" placeholder="Pin Code" onfocus="allownumericwithoutdecimal(this)" style="width: 25%" />
                                        <input id="txtaddress" class="form-control input-sm" placeholder="Enter Address" onfocus="titlecase(this)" style="width: 75%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Status
                                            <samp style="color: Red"></samp>
                                </label>
                                <select id="ddlstatus" class="form-control">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder" style="display: none">
                        <legend class="fieldSetLabel">Care Of Detail</legend>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Kin Relation/Kin Name
                                            <samp style="color: Red"></samp>
                                </label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlkinrelation" class="form-control" style="width: 25%">
                                        </select>
                                        <input class="form-control" placeholder="Kin Name" id="txtkinname" type="text" style="width: 75%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Kin Mobile 
                                            <samp style="color: Red"></samp>
                                </label>
                                <input class="form-control" placeholder="Kin Mobile" id="txtkinmobile" type="text" maxlength="10" onfocus="allownumericwithoutdecimal(this);" />

                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label ">
                                    Kin Address<samp style="color: Red"></samp></label>
                                <input id="txtkinaddress" class="form-control input-sm"
                                    placeholder="Kin Address" onfocus="titlecase(this)" />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    IsVIP/IsPoor<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlisvip" class="form-control" style="width: 50%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        <select id="ddlispoor" class="form-control" style="width: 50%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset class="fieldSetBorder" style="display: none">
                        <legend class="fieldSetLabel">MLC Detail</legend>
                        <div class="col-md-2" style="display: none">
                            <div class="form-group">
                                <label class="control-label ">
                                    Type
                                                            <samp style="color: Red"></samp>
                                </label>
                                <select id="ddltype" class="form-control">
                                    <option value="0">Direct</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    IsMLC
                                                            <samp style="color: Red"></samp>
                                </label>
                                <select id="ddlismlc" class="form-control">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                        <div id="pnlmlc" style="display: none">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        MLC Type
                                                            <samp style="color: Red"></samp>
                                    </label>
                                    <select id="ddlmlctype" class="form-control">
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Accident Place<samp style="color: Red"></samp></label>
                                    <input id="txtaccidentplace" class="form-control input-sm"
                                        placeholder="Accident Place" onfocus="titlecase(this)" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Police Station<samp style="color: Red"></samp></label>
                                    <input id="txtpolicestation" class="form-control input-sm"
                                        placeholder="Police Station " onfocus="titlecase(this)" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        MLC Remark<samp style="color: Red"></samp></label>
                                    <input id="txtmlcremark" class="form-control input-sm"
                                        placeholder="Remark " onfocus="titlecase(this)" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        MLC Certificate<samp style="color: Red"></samp></label>
                                    <input id="txtmlccertificate" class="form-control input-sm"
                                        placeholder="Certificate " onfocus="titlecase(this)" />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add New Patient" />
                        <input type="button" id="btndelete" accesskey="D" class="btn btn-success btn-xs" value="Delete" style="display: none" />
                        <input type="button" id="btnreset" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
                        <input type="button" id="btnadvancesearch" accesskey="S" class="btn btn-info btn-xs" value="Advance Search" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="ModalPatientDetail" class="modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Patient Advance Searching</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient Search Detail</legend>
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
                        <div class="col-md-8">
                            <div class="form-group">
                                <label class="control-label ">
                                    Other Search Detail</label>
                                <input id="txtpatientfilter" placeholder=" Advance Search Here" class="form-control" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient List</legend>
                        <div class="col-md-12" style="overflow: scroll">
                            <table id="gvpatient" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
                <%--<div class="modal-footer">
                    <hr />
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>
    </div>

</asp:Content>
