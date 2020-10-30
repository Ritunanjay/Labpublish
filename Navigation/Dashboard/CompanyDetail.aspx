<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="CompanyDetail.aspx.cs" Inherits="ITHospital.Navigation.Dashboard.CompanyDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/companydetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Company Information Detail</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>
        <div class="panel panel-default card-view panel-refresh" style="margin-top: 2%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>
            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="height: auto;">
                <div class="panel-body">

                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Company Information Detail</legend>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Company Code/Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <asp:HiddenField ID="hdfcompanyid" runat="server" ClientIDMode="static" Value="0" />
                                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                        <input id="txtcode" class="form-control" onfocus="uppercase(this)" placeholder="Code" clientidmode="Static" style="width: 30%" />
                                        <input id="txtname" class="form-control" onfocus="titlecase(this)" placeholder="Name" clientidmode="Static" style="width: 70%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    LicenseNo/OwnerName<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtlicenseno" class="form-control" placeholder="License No" style="width: 50%" clientidmode="Static" />
                                        <input id="txtownername" class="form-control" onfocus="titlecase(this)" style="width: 50%" placeholder="Owner Name" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Degree/Phone/Mobile<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtdegree" style="width: 33%" class="form-control" onfocus="uppercase(this)" placeholder="Degree" clientidmode="Static" />
                                        <input id="txtphone" style="width: 33%" class="form-control" onfocus="allownumericwithoutdecimal(this)" maxlength="15" placeholder="Phone" clientidmode="Static" />
                                        <input id="txtmobile" style="width: 33%" class="form-control" onfocus="allownumericwithoutdecimal(this)" maxlength="10" placeholder="Mobile" clientidmode="Static" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Mobile/EmailID<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtemergencymobile" style="width: 50%" class="form-control" onfocus="allownumericwithoutdecimal(this)" maxlength="10" placeholder="Emergency Mobile" clientidmode="Static" />
                                        <input id="txtemailid" class="form-control" style="width: 50%" onfocus="titlecase(this)" placeholder="EmailID" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Website/Software<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtwebsite" style="width: 50%" class="form-control" type="url" placeholder="Website Detail" clientidmode="Static" />
                                        <input id="txttagline" style="width: 50%" class="form-control" onfocus="uppercase(this)" placeholder="Short Name" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    AuthType<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlregtype" class="form-control" style="width: 50%" clientidmode="Static">
                                            <option value="1">HD</option>
                                            <option value="2">IIS</option>
                                            <option value="3">None</option>
                                        </select>
                                        <input id="txtsoftwarename" style="width: 50%" class="form-control" onfocus="titlecase(this)" placeholder="Software Name" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
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
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">
                                    Address<samp style="color: Red">*</samp></label>
                                <input id="txtaddress" class="form-control" onfocus="titlecase(this)" placeholder="Address" clientidmode="Static" />

                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Company Misc. Detail</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Establishment Date<samp style="color: Red">*</samp></label>
                                <input id="txtestablishmentdate" class="form-control" onfocus="titlecase(this)" placeholder="Establishment Date" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Firm RegNo<samp style="color: Red">*</samp></label>
                                <input id="txtfirmregno" class="form-control" onfocus="titlecase(this)" placeholder="Firm Reg No" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    PAN<samp style="color: Red"></samp></label>
                                <input id="txtpan" class="form-control" onfocus="titlecase(this)" placeholder="PAN" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Tax Deduction A/c No<samp style="color: Red"></samp></label>
                                <input id="txttaxdeductionno" class="form-control" onfocus="titlecase(this)" placeholder="Tax Deduction A/c No" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Contact Person Name<samp style="color: Red">*</samp></label>
                                <input id="txtcontactpersonname" class="form-control" onfocus="titlecase(this)" placeholder="Contact Person Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    No Of Days To Be Divided<samp style="color: Red">*</samp></label>
                                <input id="txtdaysdivided" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" No Of Days To Be Divided" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Minimum Age of Joining<samp style="color: Red">*</samp></label>
                                <input id="txtminageofjoining" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" No Of Days To Be Divided" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Max Age of Retirement<samp style="color: Red"></samp></label>
                                <input id="txtmaxageretirement" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" Max Age of Retirement" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Principal Officer Name<samp style="color: Red"></samp></label>
                                <input id="txtprincipal" class="form-control" onfocus="titlecase(this)" placeholder="   Principal Officer Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Designation<samp style="color: Red"></samp></label>
                                <input id="txtdesignation" class="form-control" onfocus="titlecase(this)" placeholder="Designation" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Company Info<samp style="color: Red"></samp></label>
                                <input id="txtcompanycut" class="form-control"  maxlength="5" onfocus="allownumeric(this)" placeholder="Company %" clientidmode="Static" />

                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Company Logo Detail</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Company Logo<samp style="color: Red">*</samp></label>
                                <input id="filelogo" class="form-control" type="file" clientidmode="Static" />
                                <input type="button" id="btnfileupdate" class="btn btn-success btn-xs" value="Upload Company Logo" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <img src="#" id="companylogo" class="img img-responsive img-thumbnail" style="width: 100px; height: 100px" />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>

</asp:Content>
