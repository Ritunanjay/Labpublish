<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="UserRegistration.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.UserRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/Admin/BiomatiricJS/mfs100-9.0.2.6.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/Admin/BiomatiricJS/scanssavefingureprint.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/project_js/userregistration.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">User & Employee Registration Detail</h5>
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
                        <legend class="fieldSetLabel">Add New User & Employee</legend>
                        <div class="tab-struct custom-tab-1" style="margin-top: 0px">
                            <ul role="tablist" class="nav nav-tabs" id="myTabs_7">
                                <li class="active" role="presentation"><a aria-expanded="true" data-toggle="tab" role="tab" id="Basic_Information" href="#BasicInfo">Personal Information</a></li>
                                <li role="presentation" class=""><a data-toggle="tab" id="Professonal_Information" role="tab" href="#ProfessonalInfo" aria-expanded="false">Professional Information</a></li>

                            </ul>
                            <div class="tab-content" id="myTabContent_7">
                                <div id="BasicInfo" class="tab-pane fade active in" role="tabpanel">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Permission Type<samp style="color: Red">*</samp></label>
                                                <select id="ddlusertype" class="form-control">
                                                    <option value="0">Role Permission</option>
                                                    <option value="1">User Permission</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Designation<samp style="color: Red">*</samp></label>
                                                <asp:HiddenField ID="hdfuserid" runat="server" ClientIDMode="static" Value="0" />
                                                <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                                <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                                <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                                <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                                <select id="ddlrole" class="form-control"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    DoctorID
                                    <samp style="color: Red"></samp>
                                                </label>
                                                <select id="ddldoctor" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Full Name<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <select id="ddltitle" class="form-control" style="width: 20%;">
                                                        </select>
                                                        <input id="txtusername" onfocus="uppercase(this)" type="text" class="form-control" placeholder="User Name" autocomplete="off" clientidmode="Static" style="width: 60%" />
                                                        <select id="ddlgender" class="form-control" style="width: 20%;">
                                                            <option value="0">Choose</option>
                                                            <option value="M">MALE</option>
                                                            <option value="F">FEMALE</option>
                                                            <option value="O">OTHER</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Mobile<samp style="color: Red">*</samp></label>
                                                <input id="txtmobile" type="text" onfocus="allownumericwithoutdecimal(this)" maxlength="10" class="form-control" placeholder="Mobile" clientidmode="Static" />

                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    EmailID<samp style="color: Red">*</samp></label>
                                                <input id="txtemail" type="email" class="form-control" placeholder="Email" clientidmode="Static" />

                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    Address</label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">

                                                        <input id="txtaddress" class="form-control input-sm" placeholder="Enter Address"
                                                            style="width: 100%;" />
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
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Pincode<samp style="color: Red">*</samp></label>
                                                <input id="txtpincode" type="text" onfocus="allownumericwithoutdecimal(this)" maxlength="6" class="form-control" placeholder="Pincode" clientidmode="Static" />

                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Education<samp style="color: Red"></samp></label>
                                                <input id="txteducation" type="text" class="form-control" placeholder="Education" clientidmode="Static" />

                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    LoginName/Password<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtloginname" type="text" class="form-control" placeholder="Login Name" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <input id="txtpassword" type="password" class="form-control" placeholder="Password" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="control-label ">
                                                Father/Mother Name<samp style="color: Red"></samp></label>
                                            <div class="input-group">
                                                <div class="input-group-btn">
                                                    <input type="text" id="txtfathername" class="form-control input-sm" placeholder="Enter Father Name"
                                                        style="width: 50%;" onfocus="titlecase(this)" />
                                                    <input type="text" id="txtmothername" class="form-control input-sm" placeholder="Enter Mother Name"
                                                        style="width: 50%;" onfocus="titlecase(this)" />

                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Designation<samp style="color: Red">*</samp></label>
                                                <select id="ddldesignation" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3" style="display: none">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Store
                                    <samp style="color: Red">*</samp></label>
                                                <select id="ddlstore" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2" style="display: none">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Counter<samp style="color: Red">*</samp></label>
                                                <select id="ddlbillingcounter" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Department<samp style="color: Red">*</samp></label>
                                                <select id="ddldepartment" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Centre 
                                    <samp style="color: Red">*</samp></label>
                                                <select id="ddlcentre" class="form-control">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    OfficialEmailID<samp style="color: Red"></samp></label>
                                                <input id="txtofficialemailid" type="email" class="form-control input-sm" placeholder="official EmailID" autocomplete="off" clientidmode="Static" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    Adharcard</label>
                                                <input id="txtadharcard" class="form-control input-sm" onfocus="allownumericwithoutdecimal(this)" placeholder="Enter Adharcard" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    BloodGroup</label>
                                                <select id="ddlbloodgroup" class="form-control input-sm">
                                                </select>

                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <label class="control-label ">
                                                Marital Status<samp style="color: Red"></samp></label>
                                            <select id="ddlmaritalstatus" class="form-control input-sm">
                                            </select>

                                        </div>
                                        <div class="col-md-2">
                                            <label class="control-label ">
                                                Marital Status<samp style="color: Red"></samp></label>
                                            <input type="text" id="txtspouse" class="form-control input-sm" placeholder="Enter Spouse Name"
                                                onfocus="titlecase(this)" />
                                        </div>

                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    Anniversary Date</label>
                                                <input type="text" id="txtanniversary" readonly class="form-control input-sm" placeholder="Enter Anniversary"
                                                    onfocus="titlecase(this)" />
                                            </div>
                                        </div>

                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Remark<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtremark" type="text" class="form-control" placeholder="Remark" autocomplete="off" clientidmode="Static" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="ProfessonalInfo" class="tab-pane fade" role="tabpanel">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    Religion</label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <select id="ddlreligion" class="form-control" style="width: 100%;">
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    Nationality</label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <select id="ddlnationality" class="form-control" style="width: 100%;">
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    PAN</label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">

                                                        <input id="txtpan" class="form-control input-sm" placeholder="Enter PAN"
                                                            style="width: 100%;" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label ">
                                                    VoterID</label>
                                                <input id="txtvoterid" class="form-control input-sm" placeholder="Enter VoterID" />

                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Expiry<samp style="color: Red">*</samp></label>
                                                <input id="txtpassportexpiry" readonly type="text" class="form-control" placeholder="Expiry" autocomplete="off" clientidmode="Static" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Passport<samp style="color: Red">*</samp></label>
                                                <input id="txtpassport" type="text" class="form-control" placeholder="Passport " autocomplete="off" clientidmode="Static" style="width: 100%" />
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Visa/VisaType/Expiry<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtvisa" type="text" class="form-control" placeholder="Visa" autocomplete="off" clientidmode="Static" style="width: 34%" />
                                                        <input id="txtvisatype" type="text" class="form-control" placeholder="Type" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                        <input id="txtvisexpiry" readonly type="text" class="form-control" placeholder="Expiry" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    DL/Expiry<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtdl" type="text" class="form-control" placeholder="DL" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <input id="txtdlexpiry" type="text" readonly class="form-control" placeholder="Expiry" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    ContactPerson/Mobile<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtcontactperson" type="text" class="form-control" placeholder="Contact Person Name" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <input id="txtcontactmobile" type="text" class="form-control" placeholder="Contact Mobile" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Disablity<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <select id="ddldisability" class="form-control">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    WorkerType<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <select id="ddlworkertype" class="form-control">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    PFLeavingDate/Reason<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtpfleavingdate" readonly type="text" class="form-control" placeholder="PF Leaving Date" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <select id="ddlpfreason" class="form-control" style="width: 50%">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    VPFNo/VPFLeavingDate/Reason<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtvpfno" type="text" class="form-control" placeholder="VPF No" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                        <input id="txtvpfleavingdate" readonly type="text" class="form-control" placeholder="VPF Leaving Date" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                        <select id="ddlvpfreason" class="form-control" style="width: 33%">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    ESIDNo/LeavingDate/Reason<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtesidno" type="text" class="form-control" placeholder="ESIDNo" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                        <input id="txtesidleavingdate" readonly type="text" class="form-control" placeholder="Leaving Date" autocomplete="off" clientidmode="Static" style="width: 33%" />
                                                        <select id="ddlesidreason" class="form-control" style="width: 33%">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    LeavingDate/Reason<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtdateofleaving" readonly type="text" class="form-control" placeholder="Leaving Date" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <select id="ddlleavingreason" class="form-control" style="width: 50%">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    CLOpening/Grade<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtclopening" type="text" class="form-control" placeholder="CL Opening" value="0" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <select id="ddlgrade" class="form-control" style="width: 50%">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    Notice Period<samp style="color: Red"></samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtnoticeperiod" type="text" class="form-control" placeholder="Notice Period" onabort onfocus="allownumericwithoutdecimal(this)" autocomplete="off" clientidmode="Static" style="width: 100%" />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">
                                                    DOB/DOJ<samp style="color: Red">*</samp></label>
                                                <div class="input-group">
                                                    <div class="input-group-btn">
                                                        <input id="txtdob" readonly type="text" class="form-control" placeholder="DOB" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                        <input id="txtdoj" readonly type="text" class="form-control" placeholder="DOJ" autocomplete="off" clientidmode="Static" style="width: 50%" />
                                                    </div>
                                                </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">User Detail List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                            <div class="panel-body">
                                <table id="gv" class="table table-hover table-bordered dt-responsive" style="width: 100%;">
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
                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add User" />
                <input type="button" id="btnclear" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
                <input id="btnprintPrevious" class="btn btn-info btn-xs" type="button" value="Add Fingure Here">
            </div>
        </div>
    </div>
    <div class="modal fade" id="FingurePrintModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Add Fingureprint [<span style="color: red" id="fingureusername"></span>]</h4>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Fingure Add</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <centre>  <img id="imgfingure" class="img img-thumbnail" style="
    height: 135px;
    width: 160px;
" src="../../Admin/img/fingure.png" ClientIDMode="Static" />
                       </centre>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    Device Info<samp style="color: Red"></samp></label>
                                <input id="lbldeviceinfo" readonly class="form-control" clientidmode="Static"></input>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Fingure Detail<samp style="color: Red"></samp></label>
                                <select id="ddlfingure" class="form-control" clientidmode="Static">
                                    <option value="Fingure1">Fingure 1</option>
                                    <option value="Fingure2">Fingure 2</option>
                                    <option value="Fingure3">Fingure 3</option>
                                    <option value="Fingure4">Fingure 4</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <label class="control-label">
                                    Fingure Detail<samp style="color: Red"></samp></label>
                                <input id="txtisoimage" readonly class="form-control" clientidmode="Static"></input>
                            </div>
                        </div>

                    </fieldset>

                </div>
                <div class="modal-footer">
                    <button class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" aria-hidden="true">Close</button>
                    <input type="button" id="btnaddfingureprint" accesskey="F" class="btn btnsubmitreset btn-rounded btn-xs" value="Scan Fingure" />
                    <input type="button" id="btnupdatefingure" accesskey="F" class="btn btnsubmitreset btn-rounded btn-xs" value="update Fingure Fingure" />
                </div>
            </div>

        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>
