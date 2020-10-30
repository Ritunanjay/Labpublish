<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="StudentRegistrationInfo.aspx.cs" Inherits="LabMS.Navigation.SchoolRegistration.StudentRegistrationInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/school_js/studentregistrationinfo.js") %>"></script>
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
                                    <select id="ddlfilteration" class="form-control select2">
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
                    <%--BASIC INFORMATION--%>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Personal Detail</legend>
                        <div class="col-md-2">
                            <img id="studentpic" class="img img-responsive" alt="student Image"
                                src="../../userImage/doctor.png" style="height: 117px" />
                            <input type="file" id="filestudentphoto" class="form-control" />
                            <input type="button" id="btnphotoupload" class="btn btn-success btn-xs" value="Upload Picture" />
                        </div>
                        <div class="col-md-10">
                            <div class="col-md-5">
                                <label class="control-label ">
                                    student Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddltitle" class="form-control" style="width: 20%;">
                                        </select>
                                        <input id="txtstudentname" clientidmode="Static" class="form-control input-sm" placeholder="Enter First Name"
                                            style="width: 60%;" onfocus="titlecase(this)" />
                                        <select id="ddlgender" class="form-control" style="width: 20%;">
                                            <option value="0">---Select---</option>
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
                                        Mobile Number<samp style="color: Red">*</samp></label>
                                    <input id="txtmobilenumber" class="form-control input-sm"
                                        placeholder="+91 9999999999" maxlength="10" onfocus="allownumericwithoutdecimal(this)" />
                                </div>
                            </div>
                            <div class="col-md-3" style="">
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
                                                style="width: 34%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />

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
                            <div class="col-md-6">
                               <div class="form-group">
                                  <label class="control-label ">
                                    Father Name<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <select id="ddlfathertitle" class="form-control" style="width: 30%;">
                                        </select>
                                        <input type="text" id="txtfathername" class="form-control input-sm" placeholder="Enter Father Name"
                                            style="width: 70%;" onfocus="titlecase(this)" />
                                    </div>
                                </div>
                                   </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Mother Name<samp style="color: Red"></samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">

                                            <select id="ddlmothertitle" class="form-control" style="width: 30%;">
                                            </select>
                                            <input type="text" id="txtmothername" class="form-control input-sm" placeholder="Enter Guardian Name"
                                                style="width: 70%;" onfocus="titlecase(this)" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Email</label>
                                    <input id="txtemail" class="form-control input-sm" clientidmode="Static" placeholder="info@gmail.com" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Caste</label>
                                    <select id="ddlcaste" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Religion</label>
                                    <select id="ddlreligion" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Nationality
                                        <samp style="color: Red"></samp>
                                    </label>
                                    <select id="ddlnationality" class="form-control">
                                    </select>

                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Blood Group</label>
                                    <select id="ddlbloodgroup" class="form-control">
                                    </select>

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Class/Section</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlclass" class="form-control" style="width: 50%;">
                                            </select>
                                            <select id="ddlsection" class="form-control" style="width: 50%;">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
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


                            <div class="col-md-3" style="display: none">
                                <div class="form-group">
                                    <label class="control-label ">
                                        UHID
                                                            <samp style="color: Red"></samp>
                                    </label>
                                    <input id="txtuhid" class="form-control input-sm"
                                        placeholder="UHID" readonly />
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
                            <div class="col-md-2" style="display: none">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Centre
                                            <samp style="color: Red"></samp>
                                    </label>
                                    <select id="ddlcentre" class="form-control">
                                    </select>

                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Other Details</legend>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    State</label>
                                <select id="ddlstate" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    City</label>
                                <select id="ddlcity" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Area</label>
                                <select id="ddlarea" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    Pin Code
                             <samp style="color: Red"></samp>
                                </label>
                                <input id="txtpincode" class="form-control input-sm" placeholder="Pin Code" onfocus="allownumericwithoutdecimal(this)" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                  Father's Occupation</label>
                                <select id="ddloccupation" class="form-control">
                                </select>
                            </div>
                        </div>
                          <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Registration Date</label>
                                <div class="input-group input-group-sm">
                                    <input id="txtregdate" readonly class="form-control input-sm"
                                        placeholder="DD/MM/YYYY" tabindex="-1" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label ">
                                    Address<samp style="color: Red">*</samp></label>
                                <input id="txtaddress" class="form-control input-sm" placeholder="Enter Address" onfocus="titlecase(this)" />
                            </div>
                        </div>

                      
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label ">
                                    Remark 
                                        <samp style="color: Red"></samp>
                                </label>
                                <input id="txtremark" class="form-control input-sm"
                                    placeholder="Remark" maxlength="500" onfocus="titlecase(this)" />
                            </div>
                        </div>
                    </fieldset>
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
        <div id="ModalStudentDetail" class="modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h5 class="modal-title">student Advance Searching</h5>
                    </div>
                    <div class="modal-body">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">student Search Detail</legend>
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
                                    <input id="txtstudentfilter" placeholder=" Advance Search Here" class="form-control" />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">student List</legend>
                            <div class="col-md-12" style="overflow: scroll">
                                <table id="gvstudent" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
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
