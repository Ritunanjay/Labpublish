<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="PatientBooking.aspx.cs" Inherits="LabMS.Navigation.PathologyWorking.PatientBooking" %>

<%@ Register Src="~/CommonDetail/Payment.ascx" TagPrefix="uc1" TagName="Payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/patientbooking.js") %>"></script>
    <script src="<%= ResolveClientUrl("~/project_js/payment.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div id="EditHeadTitle" runat="server">
                    <div class="col-md-9">
                        <div class="formheadtitle">Labourtary Booking Detail </div>
                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdoctorid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdftpasponserid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfcentreid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfcategoryid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfbillid" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                    </div>
                    <!-- Breadcrumb -->
                    <div class="col-md-3">
                        <input type="checkbox" value="urgent" class="" id="chckurgent" />
                        <div class="formheadtitle">Urgent Booking</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient Detail</legend>
                        <div class="col-md-3">
                            <div class="container-fluid">
                                <h5 class="weight-400" style="color: #ff0000;">Centre Visit No :<label id="lnkregistrationno" class="label label-outline label-success"></label></h5>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div>
                                <h5 class="weight-400" style="color: #ff0000;">
                                    <label id="lnkname">No Patient Selected</label>
                                    <label id="lnkuhid"></label>
                                    <label id="lnkpatientdetail"></label>
                                </h5>
                            </div>
                        </div>
                    </fieldset>
                    <div class="col-md-6">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Search Patient Detail</legend>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlfilteration" class="form-control" style="width: 25%">
                                                <option value="0">Today's Patients</option>
                                                <option value="1">All Patients</option>
                                            </select>
                                            <asp:HiddenField ID="hdfpatientid" Value="0" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="hdfreceiptid" Value="0" runat="server" ClientIDMode="Static" />
                                            <asp:HiddenField ID="hdfrecordid" Value="0" runat="server" ClientIDMode="Static" />
                                            <input id="txtsearchpatient" autocomplete="off" class="form-control input-sm"
                                                placeholder=" UHID./Patient Name: " clientidmode="Static" style="width: 50%" onmouseover="select(this);" />
                                            <input type="text" id="txtregdate" disabled="disabled" placeholder="DD/MM/YYYY" class="form-control" style="width: 25%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Labourtary Detail</legend>
                            <div class="col-md-8">
                                <label class="control-label ">
                                    Patient Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddltitle" class="form-control" style="width: 20%;">
                                            <option value="0">Title</option>
                                        </select>
                                        <input id="txtpatientname" clientidmode="Static" class="form-control input-sm" placeholder="Enter First Name"
                                            style="width: 60%;" onfocus="titlecase(this)" />
                                        <select id="ddlgender" class="form-control" style="width: 20%;">
                                            <option value="0">-Select-</option>
                                            <option value="M">MALE</option>
                                            <option value="F">FEMALE</option>
                                            <%--       <option value="O">OTHER</option>
                                            --%>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Age<samp style="color: Red">*</samp></label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtyear" class="form-control input-sm" placeholder="Y" clientidmode="Static"
                                                style="width: 33%;" maxlength="3" onfocus="allownumericwithoutdecimal(this)" onmouseover="select(this);" />
                                            <input id="txtmonth" class="form-control input-sm" placeholder="M" clientidmode="Static"
                                                style="width: 33%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />
                                            <input id="txtday" class="form-control input-sm" placeholder="D" clientidmode="Static"
                                                style="width: 33%;" maxlength="2" onfocus="allownumericwithoutdecimal(this)" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4" style="display: none">
                                <div class="form-group">
                                    <label class="control-label ">
                                        DOB</label>
                                    <input id="txtdob" class="form-control input-sm" tabindex="-1" readonly placeholder="DOB(dd/MM/yyyy)" clientidmode="static" />

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Centre</label>
                                    <select id="ddlcentre" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Client</label>
                                    <select id="ddlclient" class="form-control">
                                    </select>
                                </div>
                            </div>
                         
                            <div class="col-md-4" style="display: none">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Sample Boy</label>
                                    <select id="ddlsampleBoy" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Doctor Name</label>
                                    <select id="ddldoctor" class="form-control">
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Mobile</label>
                                    <input id="txtmobilenumber" class="form-control" value="" placeholder="Mobile" maxlength="10" onfocus="allownumericwithoutdecimal(this);" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        EmailID<samp style="color: Red"></samp></label>
                                    <input id="txtemailid" class="form-control" maxlength="150" onfocus="lowercase(this);" placeholder="Email ID" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Address<samp style="color: Red"></samp></label>
                                    <input id="txtaddress" class="form-control" maxlength="350" placeholder="Address" onfocus="titlecase(this);" />
                                </div>
                            </div>

                           
                         
                             <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        FileUpload</label>
                                    <input id="filedocument" type="file" class="form-control" />
                                </div>
                            </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Patient Category<samp style="color: Red"></samp></label>
                                    <select id="ddlpatientcategory" class="form-control">
                                    </select>
                                </div>
                            </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        TPA Sponser</label>
                                    <select id="ddltpasponser" class="form-control">
                                    </select>
                                </div>
                            </div>
                           
                           
                        </fieldset>
                    </div>
                    <div class="col-md-6">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Search Investigation Item</legend>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlcategory" class="form-control" style="width: 25%; display: none">
                                                <option>All</option>
                                                <option>Labourtary</option>
                                                <option>Profile</option>
                                                <option>Radiology</option>
                                                <option>Procedure</option>
                                            </select>
                                            <input id="txtitemsearch" class="form-control" placeholder="Search Item Here" type="text" style="width: 80%;" onmouseover="select(this);" />
                                            <input id="txtqty" class="form-control" value="1" placeholder="Quantity" style="width: 20%;" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <input id="btnsaveitem" type="button" accesskey="I" class="btn  btn-xs btn-danger" onfocus="addsaveitem(this);" value="Add Item">
                                </div>
                            </div>

                        </fieldset>

                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Add Order Detail Here</legend>

                            <div class="col-md-12" style="overflow: scroll; height: auto;">
                                <div class="form-group">
                                    <table class="table table-responsive table-stripped table-bordered">
                                        <thead>
                                            <tr>
                                                <th style='width: 15px' class='center'>Action</th>
                                                <th>Information</th>
                                                 <th>Code</th>
                                                <th>Investigation</th>
                                                <th>Rate</th>
                                                <th>Qty</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody id="gvlaborder">
                                    </table>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-md-12">
                        <fieldset class="fieldSetBorder">
                            <legend class="fieldSetLabel">Billing Detail</legend>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Total Amount</label>
                                    <input id="txttotal" class="form-control" value="0" placeholder="Total (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Extra By/Extra</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddlextraby" class="form-control" style="width: 50%;">
                                            </select>
                                            <input id="txtextra" style="width: 50%;" readonly class="form-control" value="0" placeholder="Extra (Rs.)" onfocus="allownumericwithoutdecimal(this);" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Discount By</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <select id="ddldiscountby" class="form-control" style="width: 33%;">
                                            </select>
                                            <input id="txtdiscountper" readonly class="form-control" value="0" placeholder="Percentage (%)" onfocus="allownumeric(this);" style="width: 33%;" />
                                            <input id="txtdiscount" readonly class="form-control" value="0" placeholder="Discount (Rs.)" onfocus="allownumeric(this);" style="width: 34%;" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Net Amount</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtnet" class="form-control" value="0" placeholder="Net (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Paid/Balance</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtpaid" class="form-control" style="width: 50%;" value="0" placeholder="Paid (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                            <input id="txtbalance" class="form-control" style="width: 50%;" value="0" placeholder="Balance (Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        PayMode</label>
                                    <select id="ddlpaymode" class="form-control" accesskey="P">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Creditor</label>
                                    <select id="ddlcreditor" class="form-control" accesskey="C">
                                    </select>
                                </div>
                            </div>
                             <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Coupon Code<samp style="color: Red"></samp></label>
                                    <input id="txtcouponcode" class="form-control" placeholder="Coupon Code" />
                                </div>
                            </div>
                              
                            <div class="col-md-4" style="display: none;">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Digital Card</label>
                                    <input id="txtdigitalcard" class="form-control" value="0" placeholder="Digital Card(Rs.)" disabled="disabled" onfocus="allownumericwithoutdecimal(this);" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Digital Card
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <input id="txtdigitalcardbalance" class="form-control" placeholder="Digital Card" disabled="disabled" style="width: 100%" />
                                            <button class="btn btn-primary btn-icon-anim btn-square btn-sm btn" style="height: 80%; display: none;"><i class="icon-user"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="col-md-4">
                                <div class="form-group">
                                    <label class="control-label ">
                                        Remark<samp style="color: Red"></samp></label>
                                    <input id="txtremark" class="form-control" placeholder="Remark" onfocus="titlecase(this);" maxlength="350" />
                                </div>
                            </div>

                        </fieldset>

                    </div>
                </div>
                <div class="col-md-12 fixbuttonsectionbuttom">
                    <div class="col-md-12 text-center">
                        <input id="btnpayment" type="button" accesskey="P" class="btn btn-info btn-xs lnkpayment" value="Payment Here" />
                        <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Save Booking" />
                        <input type="button" id="btnreset" accesskey="C" class="btn btn-warning btn-xs" value="Clear" />
                        <input type="button" id="btnbookingsearch" accesskey="S" class="btn btn-warning btn-xs" value="Search Booking" />
                        <input id="btnadddoctor" type="button" accesskey="D" class="btn btn-info btn-xs lnkadddoc" value="Add Doc" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Payment--->
    <div id="ModalPayment" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Payment Here</h5>
                </div>
                <div class="modal-body">
                    <uc1:Payment runat="server" ID="Payment" />
                </div>
                <%--<div class="modal-footer">
                    <hr />
                  
                      <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>--%>
            </div>
        </div>
    </div>

    <div id="ModalPatientBookingDetail" class="modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Patient Booking Searching</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Patient Booking Search Detail</legend>
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
                            <table id="gvbooking" class="table table-hover table-bordered dt-responsive" style="width: 100%;">
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
    <div id="ModalDocetail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h5 class="modal-title">Add New Doctor Here</h5>
                </div>
                <div class="modal-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Add New Doctor Detail</legend>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Code/Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtdoctorcode" onfocus="uppercase(this);" class="form-control" placeholder="Code" clientidmode="Static" style="width: 30%" />
                                        <input id="txtdoctorname" onfocus="titlecase(this);" class="form-control" placeholder="Physician Name" clientidmode="Static" style="width: 70%" />
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
                                        <input id="txtdoctormobile" class="form-control" maxlength="10" onfocus="allownumericwithoutdecimal(this);" placeholder="Mobile" clientidmode="Static" style="width: 50%" />
                                        <input id="txtdoctoremailid" class="form-control" maxlength="150" placeholder="EmailID" clientidmode="Static" style="width: 50%" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
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


                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Address<samp style="color: Red"></samp></label>
                                <input id="txtdocaddress" class="form-control" placeholder="Address" clientidmode="Static" />

                            </div>
                        </div>

                    </fieldset>
                </div>
                <div class="modal-footer">
                    <hr />
                    <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" id="adddoctor" value="Add New Doctor" />
                    <input type="button" class="btn btnsubmitreset btn-rounded btn-xs" data-dismiss="modal" value="X" />
                </div>
            </div>
        </div>
    </div>

</asp:Content>
