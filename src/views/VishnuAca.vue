<template>
  <HeroBar v-if="formStatus !== 0">ACADEMIC DETAILS FORM</HeroBar>

  <HeroBar v-if="formStatus == 0" id="formFilled"
    >You have already filled this form</HeroBar
  >
  <CardComponent class="mb-[5px] mt-[5px]" v-if="formStatus !== 0">
    <div
      class="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-6"
    >
      <field
        label="Current Pursuing Degree"
        :error="highestDegreeError"
        mandatory
      >
        <multiselect
          placeholder="Select Highest Degree"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="highestDegree_"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          valueProp="aid"
          track-by="name"
          v-model="form.highest_on_going_degree"
          @select="fetchRequiredApis(form.highest_on_going_degree)"
        />
      </field>
    </div>
  </CardComponent>
  <CardComponent v-if="form.highest_on_going_degree == 2">
    <HeroBar>Master Degree</HeroBar>
    <div
      class="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4"
    >
      <!--MASTER  DEGREE TYPE  -->
      <field label=" Master Degree Type" :error="mdegtypeError" mandatory>
        <multiselect
          placeholder="Select Master Degree Type"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_type_id"
          @select="
            filterMasterStreams(mastersCompleteData.master_degree_type_id)
          "
          :options="masterDegreeTypes"
        />
      </field>
      <!-- OTHER DEGREE TYPE  -->
      <field
        label="Other Master Degree type "
        :error="mdegtypeOtherError"
        v-if="mastersCompleteData.master_degree_type_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree type "
          v-model="mastersCompleteData.other_master_degree_type"
        />
      </field>
      <!-- MASTERS STREAM -->
      <field label="Master Degree Stream" :error="mstreamError" mandatory>
        <multiselect
          placeholder="Select Master Degree Stream"
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_stream_id"
          :options="masterDegreeStream"
          @search-change="searchMastersStream"
        />
      </field>

      <!-- OTHER MASTERS STREAM -->
      <field
        label="Other Master Degree Stream"
        v-if="mastersCompleteData.master_degree_stream_id === 0"
        :error="mstreamOtherError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree Stream"
          v-model="mastersCompleteData.master_degree_other_stream_name"
        />
      </field>
      <!-- Master YEAR OF PASSOUT -->
      <field label="Probable year of passout" :error="myopError" mandatory>
        <multiselect
          placeholder="Select Year of Passout"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          v-model="mastersCompleteData.master_degree_currently_pursuing_year"
          :options="mastersYOP_options"
        />
      </field>
      <!-- Master USN -->
      <field label="University Register Number / Exam Roll No">
        <control
          type="text"
          placeholder="Enter University Register Number / Exam Roll No"
          v-model="
            mastersCompleteData.master_degree_university_registration_number
          "
          @input="
            () => {
              mastersCompleteData.master_degree_university_registration_number =
                mastersCompleteData.master_degree_university_registration_number.replace(
                  /[^a-zA-Z0-9]/g,
                  ''
                );
            }
          "
        />
      </field>

      <field label="CGPA/Percentage" mandatory :error="masters_marktype_error">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="mastresmarktype"
          v-model="mastersCompleteData.master_degree_mark_type"
          type="radio"
          @change="
            togglePercentCgpa(mastersCompleteData.master_degree_mark_type)
          "
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="mastresmarktype"
          v-model="mastersCompleteData.master_degree_mark_type"
          type="radio"
          @change="
            togglePercentCgpa(mastersCompleteData.master_degree_mark_type)
          "
        />
      </field>
      <!--Master  CGPA -->
      <field
        v-if="mastersCompleteData.master_degree_mark_type == 1"
        label="CGPA"
        :error="mcgpaError"
        mandatory
      >
        <control
          v-model="mastersCompleteData.master_degree_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>

      <!-- master percentage -->
      <field
        v-if="mastersCompleteData.master_degree_mark_type == 2"
        label="Percentage"
        :error="mpercentageError"
        mandatory
      >
        <control
          v-model="mastersCompleteData.master_degree_mark_type_value"
          type="text"
          placeholder="Enter your Percentage"
      /></field>

      <!-- Masters state -->
      <field
        label="Master's College - State"
        mandatory
        :error="mColgStateError"
      >
        <multiselect
          placeholder="Select Master's College State"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          :value="value"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_college_state_id"
          @select="
            fetchMasterDistrictAndCollege(
              mastersCompleteData.master_degree_college_state_id
            )
          "
          @search-change="searchMasterState"
          :options="MasterscolgStateOptions"
        />
      </field>
      <!--OTHER MAster STATE -->
      <field
        label="Other Master Degree College State "
        v-if="mastersCompleteData.master_degree_college_state_id === 0"
        :error="mColgStateOtherError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree College State"
          v-model="mastersCompleteData.master_degree_college_other_state_name"
        />
      </field>

      <!-- master district -->
      <field
        label="Master Degree College District"
        :error="mColgDistError"
        mandatory
      >
        <multiselect
          placeholder="Select Master Degree College District"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_college_district_id"
          @search-change="searcMasterDistrict"
          :options="MastercolgDistrictOptions"
        />
      </field>

      <!--OTHER Master DISTRICT -->
      <field
        label="Other Master Degree College District "
        v-if="mastersCompleteData.master_degree_college_district_id === 0"
        :error="mColgDistOtherError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree College District"
          v-model="
            mastersCompleteData.master_college_degree_other_district_name
          "
        />
      </field>

      <!-- MAster  University -->
      <field label="Master Degree University" :error="mUniverError" mandatory>
        <multiselect
          placeholder="Select Master Degree University"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_university_id"
          @search-change="masterBoardSearch"
          :options="masterDegreeUniversity"
        />
      </field>
      <!--MASTER OTHER UNIVERSIT-->
      <field
        label="Other Master Degree University"
        v-if="mastersCompleteData.master_degree_university_id === 0"
        :error="mUniverOtherError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree University"
          v-model="mastersCompleteData.master_degree_other_university_name"
        />
      </field>

      <!-- MASTERS DEGREE COLLEGE -->
      <field label="Master Degree College" :error="mColgError" mandatory>
        <multiselect
          placeholder="Select Master Degree College"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="mastersCompleteData.master_degree_college_id"
          @search-change="masterCollegeSearch"
          :options="masterDegreeCollege"
        />
      </field>
      <!--OTHER MASTERS COLLEGE -->
      <field
        label="Other Master Degree College"
        v-if="mastersCompleteData.master_degree_college_id === 0"
        :error="mColgOtherError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Master Degree College"
          v-model="mastersCompleteData.master_degree_other_college_name"
        />
      </field>

      <!--Master YEAR GAP -->
      <field
        label="Any Academic year gap till Masters"
        mandatory
        :error="MastersAnyAcamdeciGapError"
      >
        <!-- <CheckRadioPicker
            :value="true"
            name="do_you_have_academic_gap_in_master_degree"
            v-model="mastersCompleteData.do_you_have_academic_gap_in_master_degree"
            type="radio"
            @change="toggleYearGap(mastersCompleteData.do_you_have_academic_gap_in_master_degree)"
            
          /> -->
        <label for="Yes">Yes</label>
        <input
          type="radio"
          :value="true"
          id="Yes"
          name="do_you_have_academic_gap_in_master_degree"
          v-model="
            mastersCompleteData.do_you_have_academic_gap_in_master_degree
          "
          @change="
            toggleYearGap(
              mastersCompleteData.do_you_have_academic_gap_in_master_degree
            )
          "
        />

        <label for="No">No</label>
        <input
          type="radio"
          :value="false"
          id="No"
          name="do_you_have_academic_gap_in_master_degree"
          v-model="
            mastersCompleteData.do_you_have_academic_gap_in_master_degree
          "
          @change="
            toggleYearGap(
              mastersCompleteData.do_you_have_academic_gap_in_master_degree
            )
          "
        />
      </field>

      <!-- Master Academic year gap -->
      <field
        v-if="mastersCompleteData.do_you_have_academic_gap_in_master_degree"
        label="Number of years"
        :error="masterAcdYearGapError"
        mandatory
      >
        <multiselect
          placeholder="Select Year Gap"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="mastersCompleteData.master_degree_number_of_years"
          :options="yearGapArr"
        />
      </field>
      <!-- active Backlogs in Master Degree -->
      <field
        label="Active Backlogs in Master Degree"
        :error="MbackLogError"
        mandatory
      >
        <control
          type="number"
          placeholder="Number of Backlogs in Master Degree"
          v-model="mastersCompleteData.master_degree_active_backlogs"
        />
      </field>
    </div>
  </CardComponent>
  <CardComponent
    v-if="
      form.highest_on_going_degree === 3 || form.highest_on_going_degree === 2
    "
  >
    <HeroBar>Degree Information</HeroBar>
    <div
      class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      <field label="Degree Type" :error="degTypeError" mandatory>
        <multiselect
          placeholder="Select Degree Type"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="degreeCompleteData.degree_type_id"
          :options="degTypesOptions"
          @select="LoadDegreeStreams(degreeCompleteData.degree_type_id)"
        />
      </field>

      <!-- others degree type -->
      <field
        label="Other Degree Type"
        v-if="degreeCompleteData.degree_type_id === 0"
        mandatory
        :error="degTypeOtherError"
      >
        <control
          type="text"
          placeholder="Enter Other Degree Type"
          v-model="degreeCompleteData.other_degree_type"
        />
      </field>

      <!-- DEGREE STREAM -->
      <field label="Degree Stream" :error="degStreamError" mandatory>
        <multiselect
          placeholder="Select Degree Stream"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="degreeCompleteData.degree_stream_id"
          track-by="name"
          valueProp="id"
          label="name"
          :options="degStreamsOptions"
          @search-change="searchDegreeStream"
        />
      </field>

      <!-- others degree stream -->
      <field
        label="Other Degree Stream"
        :error="degStreamOtherError"
        v-if="degreeCompleteData.degree_stream_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Degree Stream"
          v-model="degreeCompleteData.degree_other_stream_name"
        />
      </field>

      <!-- DEGREE YOP -->
      <field label="Degree Year Of PassOut" :error="degYOPError" mandatory>
        <multiselect
          placeholder="Select Year Of PassOut"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="DEG_YOP_options"
          v-model="degreeCompleteData.degree_probable_year_of_passout"
        />
      </field>

      <!-- DEGREE USN -->
      <field label="University Register Number / Exam Roll No">
        <control
          type="text"
          placeholder="Enter University Register Number / Exam Roll No"
          v-model="degreeCompleteData.degree_university_registration_number"
          @input="
            () => {
              degreeCompleteData.degree_university_registration_number =
                degreeCompleteData.degree_university_registration_number.replace(
                  /[^a-zA-Z0-9]/g,
                  ''
                );
            }
          "
        />
      </field>

      <!-- DEGREE CGPA and PERCENTAGE -->
      <field label="CGPA/Percentage" mandatory :error="degreeMarksType">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="degreecgpa"
          v-model="degreeCompleteData.degree_mark_type"
          type="radio"
          @change="toggleBPercentCgpa(degreeCompleteData.degree_mark_type)"
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="degreepercentage"
          v-model="degreeCompleteData.degree_mark_type"
          type="radio"
          @change="toggleBPercentCgpa(degreeCompleteData.degree_mark_type)"
        />
      </field>
      <!-- CGPA -->
      <field
        v-if="degreeCompleteData.degree_mark_type === '1'"
        label="CGPA"
        :error="cgpaDegError"
        mandatory
      >
        <control
          v-model="degreeCompleteData.degree_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>
      <!-- PERCENTAGE -->
      <field
        v-if="degreeCompleteData.degree_mark_type === '2'"
        label="Percentage"
        :error="perDegError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter your Percentage"
          v-model="degreeCompleteData.degree_mark_type_value"
        />
      </field>

      <!-- DEGREE COLG STATE -->
      <field
        label="Degree College - State"
        :error="degCollegeStateError"
        mandatory
      >
        <multiselect
          placeholder="Select Degree College State"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="degreeCompleteData.degree_college_state_id"
          label="name"
          track-by="name"
          valueProp="id"
          @select="
            fetchDegreeDistrictAndCollege(
              degreeCompleteData.degree_college_state_id
            )
          "
          :options="colgStateOptions"
          @search-change="searchDegreeState"
        />
      </field>

      <!-- others degree College State  -->
      <field
        label="Other Degree College State"
        :error="degCollegeStateOtherError"
        v-if="degreeCompleteData.degree_college_state_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Degree College State"
          v-model="degreeCompleteData.degree_college_other_state_name"
        />
      </field>

      <!-- DEGREE COLG DISTRICT -->
      <field
        label="Degree College District"
        :error="degCollegeDistrictError"
        mandatory
      >
        <multiselect
          placeholder="Select Degree College District"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="colgDistrictOptions"
          v-model="degreeCompleteData.degree_college_district_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="searchDegreeDistrict"
        />
      </field>

      <!-- others degree College District  -->
      <field
        label="Other Degree College District"
        :error="degCollegeDistrictOtherError"
        v-if="degreeCompleteData.degree_college_district_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Degree College District"
          v-model="degreeCompleteData.degree_college_other_district_name"
        />
      </field>

      <!-- DEGREE UNIVERSITY -->
      <field
        label="Degree University"
        :error="degCollegeUniversityError"
        mandatory
      >
        <multiselect
          placeholder="Select Degree University"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="degUniversityOptions"
          v-model="degreeCompleteData.degree_university_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="degBoardSearch"
        />
      </field>

      <!-- others degree university  -->
      <field
        label="Other Degree University"
        :error="degCollegeOtherUniversityError"
        v-if="degreeCompleteData.degree_university_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Degree University"
          v-model="degreeCompleteData.degree_other_university_name"
        />
      </field>

      <!-- DEGREE COLLEGE -->
      <field label="Degree College" :error="degCollegeError" mandatory>
        <multiselect
          placeholder="Select Degree College"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="degCollegeOptions"
          v-model="degreeCompleteData.degree_college_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="degreeCollegeSearch"
        />
      </field>

      <!-- others degree College  -->
      <field
        label="Other Degree College"
        :error="degOtherCollegeError"
        v-if="degreeCompleteData.degree_college_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Degree College"
          v-model="degreeCompleteData.degree_other_college_name"
        />
      </field>

      <!--Bachelors YEAR GAP -->
      <field
        label="Any Academic year gap till Degree"
        mandatory
        :error="degACCGAP"
      >
        <!-- <CheckRadioPicker
            :value="true"
            name="do_you_have_academic_gap_in_master_degree"
            v-model="mastersCompleteData.do_you_have_academic_gap_in_master_degree"
            type="radio"
            @change="toggleYearGap(mastersCompleteData.do_you_have_academic_gap_in_master_degree)"
            
          /> -->
        <label for="Yes">Yes</label>
        <input
          type="radio"
          :value="true"
          id="Yes"
          name="degreeCompleteData.do_you_have_academic_gap_in_degree"
          v-model="degreeCompleteData.do_you_have_academic_gap_in_degree"
          @change="
            toggleYearGap(degreeCompleteData.do_you_have_academic_gap_in_degree)
          "
        />

        <label for="No">No</label>
        <input
          type="radio"
          :value="false"
          id="No"
          name="degreeCompleteData.do_you_have_academic_gap_in_degree"
          v-model="degreeCompleteData.do_you_have_academic_gap_in_degree"
          @change="
            toggleYearGap(degreeCompleteData.do_you_have_academic_gap_in_degree)
          "
        />
      </field>

      <!-- Bachelor's Academic year gap -->
      <field
        v-if="degreeCompleteData.do_you_have_academic_gap_in_degree"
        label="Number of years"
        :error="degAcdError"
        mandatory
      >
        <multiselect
          placeholder="Select Year Gap"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="degreeCompleteData.degree_number_of_years"
          :options="yearGapArr"
        />
      </field>
      <!-- active Backlogs in Bachelors Degree -->
      <field
        label="Active Backlogs in Bachelors Degree"
        :error="DegbackLogError"
        mandatory
      >
        <control
          type="number"
          placeholder="Number of Backlogs in Bachelors Degree"
          v-model="degreeCompleteData.degree_active_backlogs"
        />
      </field>
    </div>
  </CardComponent>
  <CardComponent
    v-if="
      form.highest_on_going_degree == 2 || form.highest_on_going_degree == 3
    "
  >
    <HeroBar>Intermediate </HeroBar>
    <field
      label="Please Choose the below option"
      :error="specializationError"
      mandatory
    >
      <CheckRadioPicker
        :options="{ puc: '12th/PUC' }"
        name="specialization"
        v-model="form.specialization"
        type="radio"
        @change="findSpecialization(form.specialization)"
      />
      <CheckRadioPicker
        :options="{ diploma: 'Diploma' }"
        name="specialization"
        v-model="form.specialization"
        type="radio"
        @change="findSpecialization(form.specialization)"
      />
      <CheckRadioPicker
        :options="{ iti: 'ITI' }"
        name="specialization"
        v-model="form.specialization"
        type="radio"
        @change="findSpecialization(form.specialization)"
      />
    </field>
  </CardComponent>

  <!-- diploma -->
  <CardComponent v-if="form.specialization == 'diploma'">
    <HeroBar>DIPLOMA INFORMATION</HeroBar>
    <div
      class="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4"
    >
      <field
        label="Diploma Stream"
        :mandatory="form.specialization === 'diploma'"
        :error="dipStreamError"
      >
        <multiselect
          placeholder="Select Diploma Stream"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="diplomaStreamOptions"
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="diplomaCompleteData.diploma_stream_id"
          @search-change="fetchDiplomaStreams"
        />
      </field>

      <!-- OTHER DIPLOMA STREAM -->
      <field
        label="Other Diploma Stream"
        :error="diplomaOtherstreamError"
        v-if="diplomaCompleteData.diploma_stream_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other Diploma Stream"
          v-model="diplomaCompleteData.other_diploma_stream_name"
        />
      </field>

      <!-- YEAR OF PASSOUT -->
      <field
        label="Probable year of passout"
        mandatory
        :error="diplomaYOPerror"
      >
        <multiselect
          placeholder="Select Year of Passout"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="DiplomaYOP"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          v-model="diplomaCompleteData.diploma_probable_year_of_passout"
        />
      </field>

      <!--USN -->
      <field label="University Register Number / Exam Roll No">
        <control
          type="text"
          placeholder="Enter University Register Number / Exam Roll No"
          v-model="diplomaCompleteData.diploma_university_registration_number"
          @input="
            () => {
              diplomaCompleteData.diploma_university_registration_number =
                diplomaCompleteData.diploma_university_registration_number.replace(
                  /[^a-zA-Z0-9]/g,
                  ''
                );
            }
          "
        />
      </field>

      <!-- diploma CGPA and Percentage -->
      <field label="CGPA/Percentage" mandatory :error="dipMarktypeError">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="diplomamarkType"
          v-model="diplomaCompleteData.diploma_mark_type"
          type="radio"
          @change="toggleDIPPercentCgpa(diplomaCompleteData.diploma_mark_type)"
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="diplomamarkType"
          v-model="diplomaCompleteData.diploma_mark_type"
          type="radio"
          @change="toggleDIPPercentCgpa(diplomaCompleteData.diploma_mark_type)"
        />
      </field>
      <!-- CGPA -->
      <field
        v-if="diplomaCompleteData.diploma_mark_type === '1'"
        label="CGPA"
        :error="diploma_mark_type_value_CGPA_Error"
        mandatory
      >
        <control
          v-model="diplomaCompleteData.diploma_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>
      <!-- PERCENTAGE -->
      <field
        v-if="diplomaCompleteData.diploma_mark_type === '2'"
        label="Percentage"
        :error="diploma_mark_type_value_P_Error"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter your Percentage"
          v-model="diplomaCompleteData.diploma_mark_type_value"
        />
      </field>

      <!-- DIPLOMA COLLEGE STATE -->
      <field
        label="Diploma College - State"
        mandatory
        :error="dipCollegeStateError"
      >
        <multiselect
          placeholder="Select Diploma College State"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="dIPcolgStateOptions"
          @select="
            fetchDiplomaDistrictAndCollege(
              diplomaCompleteData.diploma_college_state_id
            )
          "
          :selected="selected"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="diplomaCompleteData.diploma_college_state_id"
          @search-change="searchDiplomaState"
        />
      </field>

      <!-- DIPLOMA OTHER STATE -->
      <field
        label="Other Diploma College State"
        v-if="diplomaCompleteData.diploma_college_state_id === 0"
        mandatory
        :error="dipOtherCollegeStateError"
      >
        <control
          type="text"
          placeholder="Enter Other Diploma College State"
          v-model="diplomaCompleteData.diploma_college_other_state_name"
        />
      </field>

      <!-- DIPLOMA COLLEGE DISTRICT -->
      <field
        label="Diploma College District"
        mandatory
        :error="diplomaCollegeDsiatictError"
      >
        <multiselect
          placeholder="Select Diploma College District"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="diplomaDistrictOptions"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="diplomaCompleteData.diploma_college_district_id"
          @search-change="searchDiplomaDistrict"
        />
      </field>
      <!--OTHER DISTRICT -->
      <field
        label="Other Diploma college district"
        v-if="diplomaCompleteData.diploma_college_district_id === 0"
        mandatory
        :error="diplomaOtherDistrictError"
      >
        <control
          type="text"
          placeholder="Other Diploma college district"
          v-model="diplomaCompleteData.diploma_college_other_district_name"
        />
      </field>

      <!-- DIPLOMA UNIVERSITY -->
      <field label="Diploma Board" mandatory :error="diplomaBoardError">
        <multiselect
          placeholder="Select Diploma Board"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="diplomaBoardOptions"
          :selected="selected"
          :value="value"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="diplomaCompleteData.diploma_board_id"
          @search-change="diplomaBoardSearch"
        />
      </field>
      <!--DIPLOMA OTHER UNIVERSIT-->
      <field
        label="Other Diploma Board"
        v-if="diplomaCompleteData.diploma_board_id === 0"
        mandatory
        :error="diplomaOtherBoardError"
      >
        <control
          type="text"
          placeholder="Enter Other Diploma Board"
          v-model="diplomaCompleteData.diploma_other_board_name"
        />
      </field>
      <!-- DIPLOMA  COLLEGE -->
      <field label="Diploma College" mandatory :error="diplomaCollegeError">
        <multiselect
          placeholder="Select Diploma College"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="diplomaCollegeOptions"
          :selected="selected"
          :value="value"
          :onChange="onChange"
          label="name"
          valueProp="id"
          track-by="name"
          v-model="diplomaCompleteData.diploma_college_id"
          @search-change="diplomaCollegeSearch"
        />
      </field>
      <!--OTHER DIPLOMA COLLEGE -->
      <field
        label="Other Diploma College"
        v-if="diplomaCompleteData.diploma_college_id === 0"
        mandatory
        :error="diplomaOtherCollegeError"
      >
        <control
          type="text"
          placeholder="Enter Other Diploma College"
          v-model="diplomaCompleteData.diploma_other_college_name"
        />
      </field>

      <!-- diploma  -->
      <field
        label="Any Academic year gap till Diploma"
        mandatory
        :error="diplomaYearGapErrorr"
      >
        <label for="Yes">Yes</label>
        <input
          type="radio"
          :value="true"
          id="Yes"
          name="diplomaCompleteData.do_you_have_academic_gap_upto_diploma"
          v-model="diplomaCompleteData.do_you_have_academic_gap_upto_diploma"
          @change="
            toggleYearGap(
              diplomaCompleteData.do_you_have_academic_gap_upto_diploma
            )
          "
        />

        <label for="No">No</label>
        <input
          type="radio"
          :value="false"
          id="No"
          name="diplomaCompleteData.do_you_have_academic_gap_upto_diploma"
          v-model="diplomaCompleteData.do_you_have_academic_gap_upto_diploma"
          @change="
            toggleYearGap(
              diplomaCompleteData.do_you_have_academic_gap_upto_diploma
            )
          "
        />
      </field>

      <!-- Diploma's Academic year gap -->
      <field
        v-if="diplomaCompleteData.do_you_have_academic_gap_upto_diploma"
        label="Number of years"
        :error="diplomaNumberOfYearsError"
        mandatory
      >
        <multiselect
          placeholder="Select Year Gap"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="diplomaCompleteData.diploma_number_of_years"
          :options="yearGapArr"
        />
      </field>
    </div>
  </CardComponent>
  <CardComponent v-if="form.specialization == 'iti'">
    <HeroBar>ITI Information</HeroBar>
    <div
      class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    >
      <!-- ITI Stream NAme -->
      <field label="ITI Stream Name" :error="itiStreamError" mandatory>
        <multiselect
          placeholder="Select ITI Stream Name"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="itiStreamOptions"
          v-model="itiCompleteData.iti_stream_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="searchITIstreams"
        />
      </field>

      <!-- others iti strea name -->
      <field
        label="Other ITI Stream"
        v-if="itiCompleteData.iti_stream_id === 0"
        mandatory
        :error="itiStreamOtherError"
      >
        <control
          type="text"
          placeholder="Enter Other ITI Stream"
          v-model="itiCompleteData.iti_other_stream_name"
        />
      </field>

      <!-- ITI YOP -->
      <field label="Year Of Passout" :error="itiYOPError" mandatory>
        <multiselect
          placeholder="Select Year of Passout"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="Iti_YOP"
          v-model="itiCompleteData.iti_probable_year_of_passout"
        />
      </field>

      <!-- ITI USN -->
      <field label="University Register Number / Exam Roll No">
        <control
          type="text"
          placeholder="Enter University Register Number / Exam Roll No"
          v-model="itiCompleteData.iti_university_registration_number"
          @input="
            () => {
              itiCompleteData.iti_university_registration_number =
                itiCompleteData.iti_university_registration_number.replace(
                  /[^a-zA-Z0-9]/g,
                  ''
                );
            }
          "
        />
      </field>

      <!-- ITI CGPA and PERCENTAGE -->
      <field label="CGPA/Percentage" mandatory :error="itidegree">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="iticgpa"
          v-model="itiCompleteData.iti_mark_type"
          type="radio"
          @change="toggleITIPercentCgpa(itiCompleteData.iti_mark_type)"
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="iticgpa"
          v-model="itiCompleteData.iti_mark_type"
          type="radio"
          @change="toggleITIPercentCgpa(itiCompleteData.iti_mark_type)"
        />
      </field>
      <!-- CGPA -->
      <field
        v-if="itiCompleteData.iti_mark_type === '1'"
        label="CGPA"
        :error="cgpaITIError"
        mandatory
      >
        <control
          v-model="itiCompleteData.iti_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>
      <!-- PERCENTAGE -->
      <field
        v-if="itiCompleteData.iti_mark_type === '2'"
        label="Percentage"
        :error="perITIError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter your Percentage"
          v-model="itiCompleteData.iti_mark_type_value"
        />
      </field>

      <!-- ITI COLG STATE -->
      <field label="ITI College State" :error="itiColgStateError" mandatory>
        <multiselect
          placeholder="Select ITI College State"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="itiStateOptions"
          v-model="itiCompleteData.iti_college_state_id"
          @select="
            fetchITIDistrictAndCollege(itiCompleteData.iti_college_state_id)
          "
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="searchItiState"
        />
      </field>

      <!-- others ITI College State  -->
      <field
        label="Other ITI College State"
        :error="itiColgStateOtherError"
        v-if="itiCompleteData.iti_college_state_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other ITI College State"
          v-model="itiCompleteData.iti_college_other_state_name"
        />
      </field>

      <!-- ITI COLG DISTRICT -->
      <field
        label="ITI College District"
        :error="itiColgDistrictError"
        mandatory
      >
        <multiselect
          placeholder="Select ITI College District"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="itiDistrictOptions"
          v-model="itiCompleteData.iti_college_district_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="searchItiDistrict"
        />
      </field>

      <!-- others ITI College District  -->
      <field
        label="Other ITI College District"
        :error="itiColgDistrictOtherError"
        v-if="itiCompleteData.iti_college_district_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other ITI College District"
          v-model="itiCompleteData.iti_college_other_district_name"
        />
      </field>

      <!-- ITI Board -->

      <field label="ITI Board" :error="itiColgBoardError" mandatory>
        <multiselect
          placeholder="Select ITI Board"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="itiBoardOptions"
          v-model="itiCompleteData.iti_board_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="itiBoardSearch"
        />
      </field>

      <!-- others ITI Board  -->
      <field
        label="Other ITI BOARD"
        :error="itiColgBoardOtherError"
        v-if="itiCompleteData.iti_board_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other ITI BOARD"
          v-model="itiCompleteData.iti_other_board_name"
        />
      </field>

      <!-- ITI college -->
      <field label="ITI College" :error="itiCollegeError" mandatory>
        <multiselect
          placeholder="Select ITI College"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="itiCollegeOptions"
          v-model="itiCompleteData.iti_college_id"
          track-by="name"
          valueProp="id"
          label="name"
          @search-change="itiCollegeSearch"
        />
      </field>

      <!-- others ITI College  -->
      <field
        label="Other ITI College"
        :error="itiOtherCollegeError"
        v-if="itiCompleteData.iti_college_id === 0"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter Other ITI College"
          v-model="itiCompleteData.iti_other_college_name"
        />
      </field>

      <!-- iti year gap -->
      <field
        label="Any Academic year gap till ITI"
        mandatory
        :error="itiYearGapError"
      >
        <label for="Yes">Yes</label>
        <input
          type="radio"
          :value="true"
          id="Yes"
          name="itiCompleteData.do_you_have_academic_gap_upto_iti"
          v-model="itiCompleteData.do_you_have_academic_gap_upto_iti"
          @change="
            toggleYearGap(itiCompleteData.do_you_have_academic_gap_upto_iti)
          "
        />

        <label for="No">No</label>
        <input
          type="radio"
          :value="false"
          id="No"
          name="itiCompleteData.do_you_have_academic_gap_upto_iti"
          v-model="itiCompleteData.do_you_have_academic_gap_upto_iti"
          @change="
            toggleYearGap(itiCompleteData.do_you_have_academic_gap_upto_iti)
          "
        />
      </field>

      <!-- ITI's Academic year gap -->
      <field
        v-if="itiCompleteData.do_you_have_academic_gap_upto_iti"
        label="Number of years"
        :error="itiYearGapError"
        mandatory
      >
        <multiselect
          placeholder="Select Year Gap"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="itiCompleteData.iti_number_of_years"
          :options="yearGapArr"
        />
      </field>

      <!-- puc -->
    </div>
  </CardComponent>
  <CardComponent v-if="form.specialization === 'puc'">
    <HeroBar>12th / PUC Information</HeroBar>
    <div
      class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    >
      <!-- 12th CGPA and PERCENTAGE -->
      <field label="CGPA/Percentage" mandatory :error="pucmarktypeError">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="puccgpa"
          v-model="puCompleteData.puc_mark_type"
          type="radio"
          @change="togglePUCPercentCgpa(puCompleteData.puc_mark_type)"
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="puccgpa"
          v-model="puCompleteData.puc_mark_type"
          type="radio"
          @change="togglePUCPercentCgpa(puCompleteData.puc_mark_type)"
        />
      </field>
      <!-- CGPA -->
      <field
        v-if="puCompleteData.puc_mark_type === '1'"
        label="CGPA"
        :error="cgpaPUCError"
        mandatory
      >
        <control
          v-model="puCompleteData.puc_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>
      <!-- PERCENTAGE -->
      <field
        v-if="puCompleteData.puc_mark_type === '2'"
        label="Percentage"
        :error="perPUCError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter your Percentage"
          v-model="puCompleteData.puc_mark_type_value"
        />
      </field>

      <!-- 12h puc YOP -->
      <field label="Year Of PassOut" :error="pucYOPError" mandatory>
        <multiselect
          placeholder="Select Year of Passout"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="yopoptions"
          v-model="puCompleteData.twelfth_passout_year"
        />
      </field>

      <!-- year gap -->
      <field
        label="Any Academic year gap till Diploma"
        mandatory
        :error="pucAcdError"
      >
        <label for="Yes">Yes</label>
        <input
          type="radio"
          :value="true"
          id="Yes"
          name="puCompleteData.do_you_have_academic_gap_upto_puc"
          v-model="puCompleteData.do_you_have_academic_gap_upto_puc"
          @change="
            toggleYearGap(puCompleteData.do_you_have_academic_gap_upto_puc)
          "
        />

        <label for="No">No</label>
        <input
          type="radio"
          :value="false"
          id="No"
          name="puCompleteData.do_you_have_academic_gap_upto_puc"
          v-model="puCompleteData.do_you_have_academic_gap_upto_puc"
          @change="
            toggleYearGap(puCompleteData.do_you_have_academic_gap_upto_puc)
          "
        />
      </field>

      <!-- 12's Academic year gap -->
      <field
        v-if="puCompleteData.do_you_have_academic_gap_upto_puc"
        label="Number of years"
        :error="pucYopNumberOfYears"
        mandatory
      >
        <multiselect
          placeholder="Select Year Gap"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          v-model="puCompleteData.twelfth_number_of_years"
          :options="yearGapArr"
        />
      </field>
    </div>
  </CardComponent>

  <CardComponent
    v-if="
      form.highest_on_going_degree == 2 ||
      form.highest_on_going_degree == 3 ||
      form.highest_on_going_degree == 4
    "
  >
    <HeroBar>10th Information</HeroBar>
    <div
      class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
    >
      <field label="CGPA/Percentage" mandatory :error="sslcMrktypeError">
        <CheckRadioPicker
          :options="{ 1: 'Cgpa' }"
          name="sslccgpa"
          v-model="tenthCompleteData.tenth_mark_type"
          type="radio"
          @change="toggle10PercentCgpa(tenthCompleteData.tenth_mark_type)"
        />
        <CheckRadioPicker
          :options="{ 2: 'Percentage' }"
          name="sslccgpa"
          v-model="tenthCompleteData.tenth_mark_type"
          type="radio"
          @change="toggle10PercentCgpa(tenthCompleteData.tenth_mark_type)"
        />
      </field>
      <!-- CGPA -->
      <field
        v-if="tenthCompleteData.tenth_mark_type === '1'"
        label="CGPA"
        :error="cgpaSSLCError"
        mandatory
      >
        <control
          v-model="tenthCompleteData.tenth_mark_type_value"
          type="text"
          placeholder="Enter your CGPA"
      /></field>
      <!-- PERCENTAGE -->
      <field
        v-if="tenthCompleteData.tenth_mark_type === '2'"
        label="Percentage"
        :error="perSSLCError"
        mandatory
      >
        <control
          type="text"
          placeholder="Enter your Percentage"
          v-model="tenthCompleteData.tenth_mark_type_value"
        />
      </field>

      <!-- 12h puc YOP -->
      <field label="Year Of PassOut" :error="sslcYOPError" mandatory>
        <multiselect
          placeholder="Select Year of Passout"
          showOptions
          searchable
          :classes="selectClasses"
          :close-on-select="true"
          :options="SSLC_yop"
          v-model="tenthCompleteData.tenth_passout_year"
        />
      </field>
    </div>
  </CardComponent>

  <CardComponent v-if="formStatus !== 0">
    <jbButton label="SUBMIT" @click="academicDetailsSubmit" />
  </CardComponent>
</template>

<script setup>
import HeroBar from "@/components/HeroBar.vue";
import Field from "@/components/Field.vue";
import CardComponent from "@/components/CardComponent.vue";
import Control from "@/components/Control.vue";
import { computed, onBeforeMount, reactive, ref, onMounted } from "vue";
import JbButton from "@/components/JbButton.vue";
import { themeStore } from "@/stores/theme";
import { useRouter } from "vue-router";
import { selectClasses } from "@/selectcss";
import Multiselect from "@vueform/multiselect";
import { academicDetailsStore } from "@/stores/academicDetails";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import { personalDetailsStore } from "@/stores/personalDetails";
import PeronalDetails from "./PersonalDetailsForm.vue";

const theme = themeStore();
const router = useRouter();
const academicDetails = academicDetailsStore();
const PersonalDetailsStore = personalDetailsStore();

const yearGapArr = ref([1, 2, 3, 4, 5, 6, 7, 9, 10]);

const form = reactive({
  //main
  highest_on_going_degree: "",
  //specilization
  specialization: "",
  // =============================================

  //===================================10th and PUC States=================================
  //10th
  tenth_mark_type: "",
  tenth_mark_type_value: "",
  tenth_passout_year: "",

  //PUC
  puc_mark_type: "",
  puc_mark_type_value: "",
  twelfth_passout_year: "",
  do_you_have_academic_gap_upto_puc: "",
  twelfth_number_of_years: "",
  //================================================DIPLOMA States================================

  dummyData: "",
});

// error code for form
const specializationError = ref(false);

onBeforeMount(async () => {
  await academicDetails.getHighestDegree();
  await academicDetails.getCountryID();
  //   await personalDetailsStore.getFormStatus();
  await academicDetails.getMasterDegCollege(
    mastersCompleteData.master_degree_college_state_id
  );
  await academicDetails.getDegCollege(
    degreeCompleteData.degree_college_state_id
  );
  await academicDetails.getItiCollege(form.iti_college_state_id);
  await academicDetails.get_sslc_YOP();
  const value = PersonalDetailsStore.formStatus;

  if (value == 2) {
    formStatus.value = value;
    window.location.replace("/personalDetails");
  }
  if (value == 0) {
    formStatus.value = value;
    setTimeout(() => {
      window.location.replace("/mybatch");
    }, 300);
  }
});

// computed properties
const highestDegree_ = computed(() => academicDetails.highestDegree);
// masters
const masterDegreeTypes = computed(() => academicDetails.masterDegTypesData);

const masterDegreeStream = computed(() => academicDetails.MasterdegStreamsData);
const masterDegreeUniversity = computed(
  () => academicDetails.MasterdegUniversity
);
const MasterscolgStateOptions = computed(
  () => academicDetails.masterDegreeCollegeState
);

const masterDegreeCollege = computed(() => academicDetails.masterDegCollege);
const MastercolgDistrictOptions = computed(
  () => academicDetails.MascolgDistrictData
);

const mastersYOP_options = computed(() => academicDetails.mastersYOP);
const SSLC_yop = computed(()=> academicDetails.SSLC_yop)
// degree

const degTypesOptions = computed(() => academicDetails.degTypesData);
const degStreamsOptions = computed(() => academicDetails.degStreamsData);
const degUniversityOptions = computed(() => academicDetails.degUniversity);
const degCollegeOptions = computed(() => academicDetails.degCollege);
const colgStateOptions = computed(() => academicDetails.colgStateData);
const DEG_YOP_options = computed(() => {
  return academicDetails.degYOP;
});

const colgDistrictOptions = computed(() => academicDetails.colgDistrictData);

const searchDegreeDistrict = async query => {
  if (query) {
    await academicDetails.getColgDistrictData(
      degreeCompleteData.degree_college_state_id,
      query
    );
  }
};

// diploma

const diplomaStreamOptions = computed(() => academicDetails.diplomaStreamData);

const DiplomaYOP = computed(() => academicDetails.diplomaYOP);

const dIPcolgStateOptions = computed(() => academicDetails.diplomaState);
const diplomaBoardOptions = computed(() => academicDetails.diplomaBoard);
const diplomaCollegeOptions = computed(
  () => academicDetails.diplomaCollegeData
);
const diplomaDistrictOptions = computed(
  () => academicDetails.DiplomaCollegeDistrict
);

let dipuniversity_value = ref(null);
const diplomaBoardSearch = async query => {
  if (query) {
    dipuniversity_value.value = await academicDetails.getDiplomaBoard(query);
    return dipuniversity_value;
  }
};
let searchDiplomaDistrict = async query => {
  if (query) {
    await academicDetails.getDiplomaColgDistrictData(
      diplomaCompleteData.diploma_college_state_id,
      query
    );
  }
};
const searchDiplomaState = async query => {
  if (query) {
    await academicDetails.getiplomaCollegeState(query);
  }
};

let diplomaCollegeFilter = ref(null);
const diplomaCollegeSearch = async query => {
  if (query) {
    diplomaCollegeFilter.value = await academicDetails.getDiplomaCollege(
      diplomaCompleteData.diploma_college_state_id,
      query
    );
    return diplomaCollegeFilter;
  }
};

// fetch fuction
// error code for masters
const mdegtypeError = ref(false);
const mdegtypeOtherError = ref(false);
const mstreamError = ref(false);
const mstreamOtherError = ref(false);
const myopError = ref(false);
const mcgpaError = ref(false);
const masters_marktype_error = ref(false);
const mpercentageError = ref(false);
const mColgStateError = ref(false);
const mColgStateOtherError = ref(false);
const mColgDistError = ref(false);
const mColgDistOtherError = ref(false);
const mUniverError = ref(false);
const mUniverOtherError = ref(false);
const mColgError = ref(false);
const mColgOtherError = ref(false);
const masterAcdYearGapError = ref(false);
const MastersAnyAcamdeciGapError = ref(false);
const MbackLogError = ref(false);

const masterErrorDisable = () => {
  mdegtypeError.value = false;
  mdegtypeOtherError.value = false;
  mstreamError.value = false;
  mstreamOtherError.value = false;
  myopError.value = false;
  mcgpaError.value = false;
  masters_marktype_error.value = false;
  mpercentageError.value = false;
  mColgStateError.value = false;
  mColgStateOtherError.value = false;
  mColgDistError.value = false;
  mColgDistOtherError.value = false;
  mUniverError.value = false;
  mUniverOtherError.value = false;
  mColgError.value = false;
  mColgOtherError.value = false;
  masterAcdYearGapError.value = false;
  MastersAnyAcamdeciGapError.value = false;
  MbackLogError.value = false;
};

// error code for degree
const degTypeError = ref(false);
const degTypeOtherError = ref(false);
const degStreamError = ref(false);
const degStreamOtherError = ref(false);
const degYOPError = ref(false);
const degreeMarksType = ref(false);
const degCollegeStateError = ref(false);
const degCollegeStateOtherError = ref(false);
const degCollegeDistrictError = ref(false);
const degCollegeDistrictOtherError = ref(false);
const degCollegeUniversityError = ref(false);
const degCollegeOtherUniversityError = ref(false);
const degCollegeError = ref(false);
const degACCGAP = ref(false);
const degOtherCollegeError = ref(false);
const cgpaDegError = ref(false);
const perDegError = ref(false);
const degAcdError = ref(false);
const DegbackLogError = ref(false);

const degreeErrorDisable = () => {
  degTypeError.value = false;
  degTypeOtherError.value = false;
  degStreamError.value = false;
  degStreamOtherError.value = false;
  degYOPError.value = false;
  degreeMarksType.value = false;
  degCollegeStateError.value = false;
  degCollegeStateOtherError.value = false;
  degCollegeDistrictError.value = false;
  degCollegeDistrictOtherError.value = false;
  degCollegeUniversityError.value = false;
  degCollegeOtherUniversityError.value = false;
  degCollegeError.value = false;
  degACCGAP.value = false;
  degOtherCollegeError.value = false;
  cgpaDegError.value = false;
  perDegError.value = false;
  degAcdError.value = false;
  DegbackLogError.value = false;
};

// error code for diploma
const dipStreamError = ref(false);
const diplomaOtherstreamError = ref(false);
const diplomaYOPerror = ref(false);
const diploma_mark_type_value_Error = ref(false);
const diploma_mark_type_value_Error_1 = ref(false);
const dipCollegeStateError = ref(false);
const dipOtherCollegeStateError = ref(false);
const dipMarktypeError = ref(false);
const diplomaBoardError = ref(false);
const diplomaOtherBoardError = ref(false);
const diplomaCollegeError = ref(false);
const diplomaOtherCollegeError = ref(false);
const diplomaNumberOfYearsError = ref(false);
const diplomaYearGapErrorr = ref(false);
const diplomaCollegeDsiatictError = ref(false);
const diplomaOtherDistrictError = ref(false);
const diploma_mark_type_value_CGPA_Error = ref(false)
const diploma_mark_type_value_P_Error = ref(false)

const disableErrorDiploma = () => {
  dipStreamError.value = false;
  diplomaOtherstreamError.value = false;
  diplomaYOPerror.value = false;
  diploma_mark_type_value_Error.value = false;
  diploma_mark_type_value_Error_1.value = false;
  dipCollegeStateError.value = false;
  dipOtherCollegeStateError.value = false;
  dipMarktypeError.value = false;
  diplomaBoardError.value = false;
  diplomaOtherBoardError.value = false;
  diplomaCollegeError.value = false;
  diplomaOtherCollegeError.value = false;
  diplomaNumberOfYearsError.value = false;
  diplomaYearGapErrorr.value = false;
  diplomaCollegeDsiatictError.value = false;
  diplomaOtherDistrictError.value = false;
  diploma_mark_type_value_CGPA_Error.value = false
diploma_mark_type_value_P_Error.value = false
};

// error code for iti
const itiStreamError = ref(false);
const itiStreamOtherError = ref(false);
const itidegree = ref(false);
const itiYOPError = ref(false);
const cgpaITIError = ref(false);
const perITIError = ref(false);
const itiColgStateError = ref(false);
const itiColgStateOtherError = ref(false);
const itiColgDistrictError = ref(false);
const itiColgDistrictOtherError = ref(false);
const itiColgBoardError = ref(false);
const itiColgBoardOtherError = ref(false);
const itiCollegeError = ref(false);
const itiOtherCollegeError = ref(false);
const itiAcdError = ref(false);
const itiYearGapError = ref(false);

const disableErrorITI = () => {
  itiStreamError.value = false;
  itiStreamOtherError.value = false;
  itidegree.value = false;
  itiYOPError.value = false;
  cgpaITIError.value = false;
  perITIError.value = false;
  itiColgStateError.value = false;
  itiColgStateOtherError.value = false;
  itiColgDistrictError.value = false;
  itiColgDistrictOtherError.value = false;
  itiColgBoardError.value = false;
  itiColgBoardOtherError.value = false;
  itiCollegeError.value = false;
  itiOtherCollegeError.value = false;
  itiAcdError.value = false;
  itiYearGapError.value = false;
};

const mastersCompleteData = reactive({
  master_degree_type_id: "",
  other_master_degree_type: "",
  master_degree_stream_id: "",
  master_degree_other_stream_name: "",
  master_degree_currently_pursuing_year: "",
  master_degree_university_registration_number: "",
  master_degree_mark_type: "",
  master_degree_mark_type_value: "",
  master_degree_college_state_id: "",
  master_degree_college_other_state_name: "",
  master_degree_college_district_id: "",
  master_college_degree_other_district_name: "",
  master_degree_university_id: "",
  master_degree_other_university_name: "",
  master_degree_college_id: "",
  master_degree_other_college_name: "",
  do_you_have_academic_gap_in_master_degree: "",
  master_degree_number_of_years: "",
  master_degree_active_backlogs: "",
});

const degreeCompleteData = reactive({
  degree_type_id: "",
  other_degree_type: "",
  degree_stream_id: "",
  degree_other_stream_name: "",
  degree_probable_year_of_passout: "",
  degree_university_registration_number: "",
  degree_college_state_id: "",
  degree_college_other_state_name: "",
  degree_college_district_id: "",
  degree_college_other_district_name: "",
  degree_university_id: "",
  degree_other_university_name: "",
  degree_college_id: "",
  degree_other_college_name: "",
  degree_mark_type: "",
  degree_mark_type_value: "",
  do_you_have_academic_gap_in_degree: "",
  degree_number_of_years: "",
  degree_active_backlogs: "",
});

const diplomaCompleteData = reactive({
  diploma_stream_id: "",
  other_diploma_stream_name: "",
  diploma_probable_year_of_passout: "",
  diploma_university_registration_number: "",
  diploma_mark_type: "",
  diploma_mark_type_value: "",
  diploma_college_state_id: "",
  diploma_college_other_state_name: "",
  diploma_board_id: "",
  diploma_other_board_name: "",
  diploma_college_id: "",
  diploma_other_college_name: "",
  do_you_have_academic_gap_upto_diploma: "",
  diploma_number_of_years: "",
  diploma_college_district_id: "",
  diploma_college_other_district_name: "",
});

const itiCompleteData = reactive({
  iti_stream_id: "",
  iti_other_stream_name: "",
  iti_probable_year_of_passout: "",
  iti_university_registration_number: "",
  iti_college_state_id: "",
  iti_college_other_state_name: "",
  iti_college_district_id: "",
  iti_college_other_district_name: "",
  iti_board_id: "",
  iti_other_board_name: "",
  iti_college_id: "",
  iti_other_college_name: "",
  do_you_have_academic_gap_upto_iti: "",
  iti_number_of_years: "",
  iti_mark_type: "",
  iti_mark_type_value: "",
});

// puc/12th

const puCompleteData = reactive({
  puc_mark_type: "",
  puc_mark_type_value: "",
  twelfth_passout_year: "",
  do_you_have_academic_gap_upto_puc: "",
  twelfth_number_of_years: "",
});

// error code for pu
const cgpaPUCError = ref(false);
const perPUCError = ref(false);
const pucYOPError = ref(false);
const pucAcdError = ref(false);
const pucYopNumberOfYears = ref(false);
const pucmarktypeError = ref(false);

const disableErrorPu = () => {
  cgpaPUCError.value = false;
  perPUCError.value = false;
  pucYOPError.value = false;
  pucAcdError.value = false;
  pucYopNumberOfYears.value = false;
  pucmarktypeError.value = false;
};
const yopoptions = computed(() => academicDetails.yopData);

// 10th

const tenthCompleteData = reactive({
  tenth_mark_type: "",
  tenth_mark_type_value: "",
  tenth_passout_year: "",
});

// error code for 10th
const cgpaSSLCError = ref(false);
const perSSLCError = ref(false);
const sslcYOPError = ref(false);
const sslcMrktypeError = ref(false);

const disableErrorTenth = () => {
  cgpaSSLCError.value = false;
  perSSLCError.value = false;
  sslcYOPError.value = false;
  sslcMrktypeError.value = false;
};

// 10
const load_Sslc_yop = async () => {
  await academicDetails.get_sslc_YOP();
};

// find Specialization

const findSpecialization = async specialization => {
  console.log(
    "specialization",
    specialization,
    "form===>",
    form.specialization
  );
  if (specialization === "diploma") {
    await academicDetails.getDiplomaStreamsData();
    await academicDetails.getdDiplomYop();
    await academicDetails.getiplomaCollegeState();
    await academicDetails.getDiplomaBoard();
    await academicDetails.getDiplomaCollege(
      diplomaCompleteData.diploma_college_state_id
    );
  } else if (specialization === "iti") {
    await academicDetails.getItiStreamData();
    await academicDetails.getITI_YOP();
    await academicDetails.getItiStates();
    await academicDetails.getITIBoard();
  } else if (specialization === "puc") {
    await academicDetails.getYOPData();
  } else {
    console.log("go fuck yourself");
  }
};

const fetchDiplomaStreams = async query => {
  await academicDetails.getDiplomaStreamsData(query);
};

// highest qual dd
const fetchRequiredApis = async data => {
  console.log("what is highest qualification", data);
  if (data === 2) {
    await academicDetails.getMasterDegTypesData();
    await academicDetails.getMastersYOP();
    await academicDetails.getMasterDegreeState();
    await academicDetails.getDegTypesData();
    await academicDetails.getdDegreeYop();
    await academicDetails.getColgStateData();
    return;
  }
  if (data === 3) {
   await academicDetails.getDegTypesData();
    await academicDetails.getdDegreeYop();
    await academicDetails.getColgStateData();
    
    
  }
};
//!MASTER DEGREE STREAMS
const fetchmasterDegreeStreams = async (id, search) => {
  await academicDetails.getMasterDegStreamsData(id, search);
};
const searchMastersStream = async query => {
  if (query) {
    await academicDetails.getMasterDegStreamsData(
      mastersCompleteData.master_degree_type_id,
      query
    );
  }
};
let filterMasterStreams = async value => {
  await academicDetails.getMasterDegStreamsData(value);
};

// cgpa - percentage

const togglePercentCgpa = data => {
  console.log(data);
  mastersCompleteData.master_degree_mark_type_value = "";
};

// master's state
let searchMasterState = async query => {
  await academicDetails.getMasterDegreeState(query);
};

// master's district
const fetchMasterDistrictAndCollege = async masterStateId => {
  await academicDetails.getMastersColgDistrictData(masterStateId);
  await academicDetails.getMasterDegCollege(masterStateId);
  await academicDetails.getMasterDegUniversity();
};

// master university and college
const masterUniversity_value = ref(null);
const masterBoardSearch = async query => {
  if (query) {
    masterUniversity_value.value = await academicDetails.getMasterDegUniversity(
      query
    );
    return masterUniversity_value;
  }
};

const masterCollegeFilter = ref(null);
const masterCollegeSearch = async query => {
  if (query) {
    masterCollegeFilter.value = await academicDetails.getMasterDegCollege(
      mastersCompleteData.master_degree_college_state_id,
      query
    );
    return masterCollegeFilter;
  }
};

const toggleYearGap = gap => {
  console.log(
    "fuck you gap",
    mastersCompleteData.do_you_have_academic_gap_in_master_degree
  );
};

////LOAD DEGREE STREAMS
const LoadDegreeStreams = async value => {
  await academicDetails.getDegStreamsData(value);
};

const searchDegreeStream = async query => {
  if (query) {
    await academicDetails.getDegStreamsData(
      degreeCompleteData.degree_type_id,
      query
    );
  }
};

const toggleBPercentCgpa = data => {
  degreeCompleteData.degree_mark_type_value = "";
};

const togglePUCPercentCgpa = data => {
  puCompleteData.puc_mark_type_value = "";
};

const toggleDIPPercentCgpa = data => {
  diplomaCompleteData.diploma_mark_type_value = "";
};
const toggleITIPercentCgpa = data => {
  itiCompleteData.iti_mark_type_value = "";
};
const toggle10PercentCgpa = data => {
  tenthCompleteData.tenth_mark_type_value= "";
};


let searchDegreeState = async query => {
  if (query) {
    await academicDetails.getColgStateData(query);
  }
};

const fetchDegreeDistrictAndCollege = async degreeStateId => {
  await academicDetails.getColgStateData(degreeStateId);
  await academicDetails.getColgDistrictData(degreeStateId);
  await academicDetails.getDegCollege(degreeStateId);
  await academicDetails.getDegUniversity();
};

const fetchDiplomaDistrictAndCollege = async diplomaStateId => {
  await academicDetails.getDiplomaColgDistrictData(diplomaStateId);
  await academicDetails.getDiplomaCollege(diplomaStateId);
};

// iti

const searchITIstreams = async query => {
  if (query) {
    await academicDetails.getItiStreamData(query);
  }
};

const Iti_YOP = computed(() => academicDetails.iti_yop_options);
const itiStreamOptions = computed(() => academicDetails.itiStreamsData);
const itiCollegeOptions = computed(() => academicDetails.itiCollegeData);
const itiBoardOptions = computed(() => academicDetails.itiBoard);
const itiDistrictOptions = computed(() => academicDetails.itiCollegeDistrict);
const itiStateOptions = computed(() => academicDetails.itiState);

const fetchITIDistrictAndCollege = async itiStateId => {
  await academicDetails.getITIColgDistrictData(itiStateId);
  await academicDetails.getItiCollege(itiStateId);
};

let searchItiState = async query => {
  if (query) {
    await academicDetails.getItiStates(query);
  }
};

let searchItiDistrict = async query => {
  if (query) {
    await academicDetails.getITIColgDistrictData(
      itiCompleteData.iti_college_state_id,
      query
    );
  }
};

let itiUniversity_value = ref(null);
const itiBoardSearch = async query => {
  if (query) {
    itiUniversity_value.value = await academicDetails.getITIBoard(query);
    return itiUniversity_value;
  }
};

//iti college
let itiCollegeFilter = ref(null);
const itiCollegeSearch = async query => {
  if (query) {
    itiCollegeFilter.value = await academicDetails.getItiCollege(
      itiCompleteData.iti_college_state_id,
      query
    );
    return itiCollegeFilter;
  }
};
const returnTrue = () => {
  return true
}
const masterDegreeFuncValidation = (letMeTry=false) => {
  if (!mastersCompleteData.master_degree_type_id) {
    mastersCompleteData.master_degree_stream_id = "";
    mdegtypeError.value = "Select Master Degree";
    console.log("find me bitch i'm hiding here"); 
    letMeTry ? returnTrue() : ""
  }
  
  if (!mastersCompleteData.master_degree_stream_id) {
    mstreamError.value = "Select master Stream ";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
  if (!mastersCompleteData.master_degree_currently_pursuing_year) {
    myopError.value = "Select YOP";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
  if (!mastersCompleteData.master_degree_mark_type) {
    masters_marktype_error.value = "Select Either CGPA OR Percentage";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  // CGPA
  if (
    mastersCompleteData.master_degree_mark_type == 1 &&
    mastersCompleteData.master_degree_mark_type_value === ""
  ) {
    mcgpaError.value = "Enter  CGPA";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
  if (
    mastersCompleteData.master_degree_mark_type == 1 &&
    mastersCompleteData.master_degree_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(
      mastersCompleteData.master_degree_mark_type_value
    )
  ) {
    mcgpaError.value = "Enter Valid CGPA";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  // percentage
  if (
    mastersCompleteData.master_degree_mark_type == 2 &&
    mastersCompleteData.master_degree_mark_type_value === ""
  ) {
    mpercentageError.value = "Enter  percentage";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
  if (
    mastersCompleteData.master_degree_mark_type == 2 &&
    mastersCompleteData.master_degree_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(
      mastersCompleteData.master_degree_mark_type_value
    )
  ) {
    mpercentageError.value = "Enter Valid percentage";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  // master state
  if (mastersCompleteData.master_degree_college_state_id === "") {
    mColgStateError.value = "Select State";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  if (
    mastersCompleteData.master_degree_college_state_id !== "" &&
    mastersCompleteData.master_degree_college_state_id === 0 &&
    mastersCompleteData.master_degree_college_other_state_name === ""
  ) {
    mColgStateOtherError.value = "Enter State";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  } else {
    mastersCompleteData.master_degree_college_other_state_name = "";
  }

  // master district and other district
  if (
    mastersCompleteData.master_degree_college_district_id === "" ||
    mastersCompleteData.master_degree_college_district_id === null
  ) {
    mColgDistError.value = "Select District";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  if (
    mastersCompleteData.master_degree_college_state_id !== "" &&
    mastersCompleteData.master_degree_college_district_id === 0 &&
    mastersCompleteData.master_college_degree_other_district_name === ""
  ) {
    mColgDistOtherError.value = "Enter District";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  } else {
    mastersCompleteData.master_college_degree_other_district_name = "";
  }

  // master university and college

  if (mastersCompleteData.master_degree_university_id === "") {
    mUniverError.value = "Select Master's University";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  if (
    mastersCompleteData.master_degree_university_id !== "" &&
    mastersCompleteData.master_degree_university_id === 0 &&
    mastersCompleteData.master_degree_other_university_name === ""
  ) {
    // /^[A-Za-z]+$
    mUniverOtherError.value = "Enter Master's University";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  } else {
    mastersCompleteData.master_degree_other_university_name = "";
  }
  if (
    mastersCompleteData.master_degree_university_id !== "" &&
    mastersCompleteData.master_degree_university_id === 0 &&
    mastersCompleteData.master_degree_other_university_name !== "" &&
    !/^[A-Za-z]+$/.test(mastersCompleteData.master_degree_other_university_name)
  ) {
    // /^[A-Za-z]+$
    mUniverOtherError.value = "Enter Valid Master's University";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  } else {
    mastersCompleteData.master_degree_other_university_name = "";
  }

  if (mastersCompleteData.master_degree_college_id === "") {
    mColgError.value = "Select Master's College";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  if (
    mastersCompleteData.master_degree_college_id !== "" &&
    mastersCompleteData.master_degree_college_id === 0 &&
    mastersCompleteData.master_degree_other_college_name === ""
  ) {
    mColgOtherError.value = "Enter Master's College";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  } else {
    mastersCompleteData.master_degree_other_college_name = "";
  }

  // Master YEAR GAP

  if (mastersCompleteData.do_you_have_academic_gap_in_master_degree === "") {
    MastersAnyAcamdeciGapError.value = "Select Yes or No";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }

  if (
    mastersCompleteData.do_you_have_academic_gap_in_master_degree &&
    mastersCompleteData.master_degree_number_of_years === ""
  ) {
    masterAcdYearGapError.value = "Select year Gap";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
  if (!mastersCompleteData.do_you_have_academic_gap_in_master_degree) {
    mastersCompleteData.master_degree_number_of_years = "";
  }
  // Active Backlogs in Master Degree
  if (mastersCompleteData.master_degree_active_backlogs === "") {
    MbackLogError.value = "Enter Active Backlogs in Master Degree";
    console.log("find me bitch i'm hiding here");
    letMeTry ? returnTrue() : ""
  }
};

const bachelorDegreeFuncValidation = () => {
  if (
    degreeCompleteData.degree_type_id === "" ||
    degreeCompleteData.degree_type_id === null
  ) {
    degTypeError.value = "Select Degree";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_type_id !== "" &&
    degreeCompleteData.degree_type_id === 0 &&
    degreeCompleteData.other_degree_type === ""
  ) {
    degTypeOtherError.value = "Enter Other Degree";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.other_degree_type = "";
  }

  if (
    degreeCompleteData.degree_stream_id === "" ||
    degreeCompleteData.degree_stream_id === null
  ) {
    degStreamError.value = "Select Stream";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_stream_id !== "" &&
    (degreeCompleteData.degree_stream_id === 0 &&
      degreeCompleteData.degree_other_stream_name === "")
  ) {
    degStreamOtherError.value = "Enter Your Stream";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_other_stream_name = "";
  }

  if (
    degreeCompleteData.degree_probable_year_of_passout === "" ||
    degreeCompleteData.degree_probable_year_of_passout === null
  ) {
    degYOPError.value = "Select YOP";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_mark_type === "" ||
    degreeCompleteData.degree_mark_type === null
  ) {
    degreeMarksType.value = "Select Either CGPA OR Percentage";
    console.log("find me bitch i'm hiding here");
  }
  // CGPA
  if (
    degreeCompleteData.degree_mark_type === "1" &&
    degreeCompleteData.degree_mark_type_value === ""
  ) {
    console.log("fuck you Degree cgpa");
    cgpaDegError.value = "Enter CGPA";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_mark_type === 1 &&
    degreeCompleteData.degree_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(degreeCompleteData.degree_mark_type_value)
  ) {
    cgpaDegError.value = "Enter Valid CGPA";
    console.log("find me bitch i'm hiding here");
  }

  // percentage
  if (
    degreeCompleteData.degree_mark_type === "2" &&
    degreeCompleteData.degree_mark_type_value === ""
  ) {
    perDegError.value = "Enter  percentage";
    console.log("find me bitch i'm hiding here");
  }
  if (
    degreeCompleteData.degree_mark_type === "2" &&
    degreeCompleteData.degree_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(degreeCompleteData.degree_mark_type_value)
  ) {
    perDegError.value = "Enter Valid percentage";
    console.log("find me bitch i'm hiding here");
  }

  // degree State
  if (
    degreeCompleteData.degree_college_state_id === "" ||
    degreeCompleteData.degree_college_state_id === null
  ) {
    degCollegeStateError.value = "Select State";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_college_state_id !== "" &&
    (degreeCompleteData.degree_college_state_id === 0 &&
      degreeCompleteData.degree_college_other_state_name === "")
  ) {
    degCollegeStateOtherError.value = "Enter State";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_college_other_state_name = "";
  }

  // degree district and other district
  if (degreeCompleteData.degree_college_district_id === "") {
    degCollegeDistrictError.value = "Select District";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_college_state_id !== "" &&
    degreeCompleteData.degree_college_district_id === 0 &&
    degreeCompleteData.degree_college_other_district_name === ""
  ) {
    degCollegeDistrictOtherError.value = "Enter District";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_college_other_district_name = "";
  }

  // Degree university and college

  if (
    degreeCompleteData.degree_university_id === "" ||
    degreeCompleteData.degree_university_id === null
  ) {
    degCollegeUniversityError.value = "Select Bachelor's University";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_university_id !== "" &&
    degreeCompleteData.degree_university_id === 0 &&
    degreeCompleteData.degree_other_university_name === ""
  ) {
    degCollegeOtherUniversityError.value = "Enter Bachelor's University";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_other_university_name = "";
  }

  if (
    degreeCompleteData.degree_university_id !== "" &&
    degreeCompleteData.degree_university_id === 0 &&
    degreeCompleteData.degree_other_university_name !== "" &&
    !/^[A-Za-z]+$/.test(degreeCompleteData.degree_other_university_name)
  ) {
    degCollegeOtherUniversityError.value = "Enter Valid Bachelor's University";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_other_university_name = "";
  }

  if (degreeCompleteData.degree_college_id === "") {
    degCollegeError.value = "Select Bachelor's College";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.degree_college_id !== "" &&
    degreeCompleteData.degree_college_id === 0 &&
    degreeCompleteData.degree_other_college_name === ""
  ) {
    degOtherCollegeError.value = "Enter Bachelor's College";
    console.log("find me bitch i'm hiding here");
  } else {
    degreeCompleteData.degree_other_college_name = "";
  }

  // Bachelor YEAR GAP
  if (degreeCompleteData.do_you_have_academic_gap_in_degree === "") {
    degACCGAP.value = "Select Yes or No";
    console.log("find me bitch i'm hiding here");
  }

  if (
    degreeCompleteData.do_you_have_academic_gap_in_degree &&
    degreeCompleteData.degree_number_of_years === ""
  ) {
    degAcdError.value = "Select year Gap";
    console.log("find me bitch i'm hiding here");
  }
  if (!degreeCompleteData.do_you_have_academic_gap_in_degree) {
    degreeCompleteData.degree_number_of_years = "";
  }
  // Active Backlogs in Master Degree
  if (degreeCompleteData.degree_active_backlogs === "") {
    DegbackLogError.value = "Enter Active Backlogs in Bachelor Degree";
    console.log("find me bitch i'm hiding here");
  }
};

const intermediateFuncValidation = () => {
  if (form.specialization === "") {
    specializationError.value = "Select SpecializationError";
    console.log("find me bitch i'm hiding here");
  }

  // diploma
  if (
    diplomaCompleteData.diploma_stream_id === "" ||
    diplomaCompleteData.diploma_stream_id === null
  ) {
    dipStreamError.value = "Select Diploma Stream";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_stream_id !== "" &&
    diplomaCompleteData.diploma_stream_id === 0 &&
    diplomaCompleteData.other_diploma_stream_name === ""
  ) {
    diplomaOtherstreamError.value = "Enter Other Diploma Stream";
    console.log("find me bitch i'm hiding here");
  } else {
    diplomaCompleteData.other_diploma_stream_name = "";
  }

  if (
    diplomaCompleteData.diploma_probable_year_of_passout === "" ||
    diplomaCompleteData.diploma_probable_year_of_passout === null
  ) {
    diplomaYOPerror.value = "Select Diploma Year of Passout";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_mark_type === "" ||
    diplomaCompleteData.diploma_mark_type === null
  ) {
    dipMarktypeError.value = "Select Either CGPA OR Percentage";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_mark_type === "1" &&
    diplomaCompleteData.diploma_mark_type_value === ""
  ) {
    diploma_mark_type_value_CGPA_Error.value = "Enter CGPA";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_mark_type === "1" &&
    diplomaCompleteData.diploma_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(diplomaCompleteData.diploma_mark_type_value)
  ) {
    diploma_mark_type_value_CGPA_Error.value = "Enter Valid CGPA";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_mark_type === "2" &&
    diplomaCompleteData.diploma_mark_type_value === ""
  ) {
    diploma_mark_type_value_P_Error.value = "Enter Percentage";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_mark_type === "2" &&
    diplomaCompleteData.diploma_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(diplomaCompleteData.diploma_mark_type_value)
  ) {
    diploma_mark_type_value_P_Error.value = "Enter Valid percentage";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_college_state_id === "" ||
    diplomaCompleteData.diploma_college_state_id === null
  ) {
    dipCollegeStateError.value = "Select Diploma State";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_college_state_id !== "" &&
    (diplomaCompleteData.diploma_college_state_id === 0 &&
      diplomaCompleteData.diploma_college_other_state_name)
  ) {
    dipOtherCollegeStateError.value = "Enter Diploma State";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_college_district_id === "" ||
    diplomaCompleteData.diploma_college_district_id === null
  ) {
    diplomaCollegeDsiatictError.value = "Select District";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_college_district_id !== "" &&
    diplomaCompleteData.diploma_college_district_id === 0 &&
    diplomaCompleteData.diploma_college_other_district_name
  ) {
    diplomaOtherDistrictError.value = "Enter District";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_board_id === "" ||
    diplomaCompleteData.diploma_board_id === null
  ) {
    diplomaBoardError.value = "Select Diploma Board";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_board_id !== "" &&
    (diplomaCompleteData.diploma_board_id === 0 &&
      diplomaCompleteData.diploma_other_board_name === "")
  ) {
    diplomaOtherBoardError.value = "Enter Diploma Board";
    console.log("find me bitch i'm hiding here");
  } else {
    diplomaCompleteData.diploma_other_board_name = "";
  }

  if (
    diplomaCompleteData.diploma_college_id === "" ||
    diplomaCompleteData.diploma_college_id === null
  ) {
    diplomaCollegeError.value = "Select Diploma College";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.diploma_college_id !== "" &&
    (diplomaCompleteData.diploma_college_id === 0 &&
      diplomaCompleteData.diploma_other_college_name === "")
  ) {
    diplomaOtherCollegeError.value = "Enter Diploma College";
    console.log("find me bitch i'm hiding here");
  }

  if (
    diplomaCompleteData.do_you_have_academic_gap_upto_diploma === "" ||
    diplomaCompleteData.do_you_have_academic_gap_upto_diploma === null
  ) {
    diplomaYearGapErrorr.value = "Select Yes or No";
    console.log("find me bitch i'm hiding here");
  }

  if (
    (diplomaCompleteData.do_you_have_academic_gap_upto_diploma &&
      diplomaCompleteData.diploma_number_of_years === "") 
    
  ) {
    diplomaNumberOfYearsError.value = "Select Year Gap";
    console.log("find me bitch i'm hiding here");
  }

  // ITI

  if (
    itiCompleteData.iti_stream_id === "" ||
    itiCompleteData.iti_stream_id === null
  ) {
    itiStreamError.value = "Select ITI Stream";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_stream_id !== "" &&
    itiCompleteData.iti_stream_id === 0 &&
    itiCompleteData.iti_other_stream_name === ""
  ) {
    itiStreamOtherError.value = "Enter ITI Stream";
    console.log("find me bitch i'm hiding here");
  } else {
    itiCompleteData.iti_other_stream_name = "";
  }

  if (itiCompleteData.iti_probable_year_of_passout === "") {
    itiYOPError.value = "Select Year Of Passout";
    console.log("find me bitch i'm hiding here");
  }

  // CGPA and Percentage
  if (itiCompleteData.iti_mark_type === "") {
    itidegree.value = "Select Either Yes or No";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_mark_type === "1" &&
    itiCompleteData.iti_mark_type_value === ""
  ) {
    cgpaITIError.value = "Enter CGPA";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_mark_type === "1" &&
    itiCompleteData.iti_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(itiCompleteData.iti_mark_type_value)
  ) {
    cgpaITIError.value = "Enter Valid CGPA";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_mark_type === "2" &&
    itiCompleteData.iti_mark_type_value === ""
  ) {
    perITIError.value = "Enter Percentage";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_mark_type === "2" &&
    itiCompleteData.iti_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(itiCompleteData.iti_mark_type_value)
  ) {
    perITIError.value = "Enter Valid Percentage";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_college_state_id === "" ||
    itiCompleteData.iti_college_state_id === null
  ) {
    itiColgStateError.value = "Select State";
    console.log("find me bitch i'm hiding here");
  }

  if (
    itiCompleteData.iti_college_state_id !== "" &&
    itiCompleteData.iti_college_state_id === 0 &&
    itiCompleteData.iti_college_other_state_name === ""
  ) {
    itiColgStateOtherError.value = "Enter State";
    console.log("find me bitch i'm hiding here");
  } else {
    itiCompleteData.iti_college_other_state_name = "";
  }

  if (itiCompleteData.iti_college_district_id === "") {
  itiColgDistrictError.value = "Select District"
  console.log("find me bitch i'm hiding here")
}

if (itiCompleteData.iti_college_district_id !== "" && itiCompleteData.iti_college_district_id === 0 &&  itiCompleteData.iti_college_other_district_name === "") {
  itiColgDistrictOtherError.value = "Enter District"
  console.log("find me bitch i'm hiding here")
} else {
  itiCompleteData.iti_college_other_district_name = ""
}

  if (itiCompleteData.iti_board_id === "") {
  itiColgBoardError.value = "Select Board"
  console.log("find me bitch i'm hiding here")
}
  if (itiCompleteData.iti_board_id !== "" && itiCompleteData.iti_board_id === 0 && itiCompleteData.iti_other_board_name === "") {
    itiColgBoardOtherError.value= "Enter Board"
    console.log("find me bitch i'm hiding here")
  } else {
    itiCompleteData.iti_other_board_name = ""
  }

  if(itiCompleteData.iti_college_id === "") {
     itiCollegeError.value = "select college"
     console.log("find me bitch i'm hiding here")
  }
  if (itiCompleteData.iti_college_id !== "" && itiCompleteData.iti_college_id === 0 && itiCompleteData.iti_other_college_name === "") {
    itiOtherCollegeError.value = "enter college"
    console.log("find me bitch i'm hiding here")
  } else {
    itiCompleteData.iti_other_college_name = ""
  }

  if (itiCompleteData.do_you_have_academic_gap_upto_iti === "") {
      itiYearGapError.value = "Select yes or no"
      console.log("find me bitch i'm hiding here")
    }

  if (itiCompleteData.do_you_have_academic_gap_upto_iti  && itiCompleteData.iti_number_of_years === "") {
      itiYearGapError.value = "Select Year Gap"
      console.log("find me bitch i'm hiding here")
    }






  // puc/12th

  if (form.specialization === "puc" && puCompleteData.puc_mark_type === "") {
    pucmarktypeError.value = "Select Either Percentage or CGPA";
  }

  if (
    form.specialization === "puc" &&
    puCompleteData.puc_mark_type === "1" &&
    puCompleteData.puc_mark_type_value === ""
  ) {
    cgpaPUCError.value = "Enter CGPA";
    console.log("find me bitch i'm hiding here")
   
  }

  if (
    form.specialization === "puc" &&
    puCompleteData.puc_mark_type === "1" &&
    puCompleteData.puc_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(puCompleteData.puc_mark_type_value)
  ) {
    cgpaPUCError.value = "Enter a Valid CGPA";
    console.log("find me bitch i'm hiding here")
   
  }

  if (
    form.specialization === "puc" &&
    puCompleteData.puc_mark_type === "2" &&
    puCompleteData.puc_mark_type_value === ""
  ) {
    perPUCError.value = "Enter Percentage";
    console.log("find me bitch i'm hiding here")
    
  }

  if (
    form.specialization === "puc" &&
    puCompleteData.puc_mark_type === "2" &&
    puCompleteData.puc_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(puCompleteData.puc_mark_type_value)
  ) {
    perPUCError.value = "Enter a Valid Percentage";
    console.log("find me bitch i'm hiding here")
    
  }

  if (puCompleteData.twelfth_passout_year === "") {
    pucYOPError.value = "Select Year Of Passout";
    console.log("find me bitch i'm hiding here")
  }

  if (puCompleteData.do_you_have_academic_gap_upto_puc === "") {
    pucAcdError.value = "Select Yes or No";
    console.log("find me bitch i'm hiding here")
  }

  if (
    puCompleteData.do_you_have_academic_gap_upto_puc !== "" &&
    puCompleteData.twelfth_number_of_years === ""
  ) {
    pucYopNumberOfYears.value = "select year gap";
    console.log("find me bitch i'm hiding here")
  }
};

const tenthFuncValidation = () => {
  if (tenthCompleteData.tenth_mark_type === "") {
    sslcMrktypeError.value = "Select Either CGPA OR Percentage";
  }

  // CGPA
  if (
    tenthCompleteData.tenth_mark_type == 1 &&
    tenthCompleteData.tenth_mark_type_value === ""
  ) {
    cgpaSSLCError.value = "Enter  CGPA";
    console.log("find me bitch i'm hiding here")
  }
  if (
    tenthCompleteData.tenth_mark_type == 1 &&
    tenthCompleteData.tenth_mark_type_value !== "" &&
    !/^(10|\d)(\.\d{1,2})?$/.test(tenthCompleteData.tenth_mark_type_value)
  ) {
    cgpaSSLCError.value = "Enter Valid CGPA";
    console.log("find me bitch i'm hiding here")
  }

  // percentage
  if (
    tenthCompleteData.tenth_mark_type == 2 &&
    tenthCompleteData.tenth_mark_type_value === ""
  ) {
    perSSLCError.value = "Enter  percentage";
    console.log("find me bitch i'm hiding here")
  }
  if (
    tenthCompleteData.tenth_mark_type == 2 &&
    tenthCompleteData.tenth_mark_type_value !== "" &&
    !/^(3[5-9]|[4-9][0-9])$/.test(tenthCompleteData.tenth_mark_type_value)
  ) {
    perSSLCError.value = "Enter Valid percentage";
    console.log("find me bitch i'm hiding here")
  }

  if (tenthCompleteData.tenth_passout_year === "") {
    sslcYOPError.value = "Select yop";
    console.log("find me bitch i'm hiding here")
  }
};

const conditionCheck = () => {
  if (form.highest_on_going_degree === 2) {
    // master
    masterDegreeFuncValidation();
    // degree
    bachelorDegreeFuncValidation();

    // Intermediate
    intermediateFuncValidation();

    // 10th
    tenthFuncValidation();
  }
  if (form.highest_on_going_degree === 3) {
    bachelorDegreeFuncValidation();

    // Intermediate
    intermediateFuncValidation();

    // 10th
    tenthFuncValidation();
  }
};




const formData = new FormData();
  const formDataForTypeMaster = new FormData()
const academicDetailsSubmit = async() => {
  specializationError.value = false;
  masterErrorDisable();
  degreeErrorDisable();
  disableErrorDiploma();
  disableErrorITI();
  disableErrorPu();
  disableErrorTenth();
  conditionCheck();


  
  if (form.highest_on_going_degree === 2) {
    if (!mdegtypeError.value &&
!mstreamError.value &&
!myopError.value &&
!masters_marktype_error.value &&
!mcgpaError.value &&
!mcgpaError.value &&
!mpercentageError.value &&
!mpercentageError.value &&
!mColgStateError.value &&
!mColgStateOtherError.value &&
!mColgDistError.value &&
!mColgDistOtherError.value &&
!mUniverError.value &&
!mUniverOtherError.value &&
!mColgError.value &&
!mColgOtherError.value &&
!MastersAnyAcamdeciGapError.value &&
!masterAcdYearGapError.value &&
!MbackLogError.value  ) {
      console.log("poda poole");
      formDataForTypeMaster.append("highest_on_going_degree", form.highest_on_going_degree)
      formDataForTypeMaster.append("specialization", form.specialization);
      formDataForTypeMaster.append('master_degree_type_id', mastersCompleteData.master_degree_type_id)
  formDataForTypeMaster.append("tenth_mark_type", tenthCompleteData.tenth_mark_type);
          formDataForTypeMaster.append("tenth_mark_type_value", tenthCompleteData.tenth_mark_type_value);
      formDataForTypeMaster.append("tenth_passout_year", tenthCompleteData.tenth_passout_year);
          
          mastersCompleteData.master_degree_type_id === 0
            ? formDataForTypeMaster.append(
                "other_master_degree_type",
                mastersCompleteData.other_master_degree_type
              )
            : formDataForTypeMaster.append(
                "master_degree_type_id",
                mastersCompleteData.master_degree_type_id
              );

          if (mastersCompleteData.master_degree_stream_id === 0) {
            formDataForTypeMaster.append(
              "other_master_degree_stream",
              mastersCompleteData.master_degree_other_stream_name
            );
          } else {
            formDataForTypeMaster.append(
              "master_degree_stream_id",
              mastersCompleteData.master_degree_stream_id
            );
          }
          formDataForTypeMaster.append(
            "master_degree_active_backlogs",
            mastersCompleteData.master_degree_active_backlogs
          );
          formDataForTypeMaster.append(
            "master_degree_currently_pursuing_year",
            mastersCompleteData.master_degree_currently_pursuing_year
          );
          formDataForTypeMaster.append(
            "master_degree_university_registration_number",
            mastersCompleteData.master_degree_university_registration_number
          );
          formDataForTypeMaster.append(
            "master_degree_mark_type",
            mastersCompleteData.master_degree_mark_type
          );
          formDataForTypeMaster.append(
            "master_degree_mark_type_value",
            mastersCompleteData.master_degree_mark_type_value
          );

          if (mastersCompleteData.master_degree_college_state_id === 0) {
            formDataForTypeMaster.append(
              "master_degree_college_other_state_name",
              mastersCompleteData.master_degree_college_other_state_name
            );
          } else {
            formDataForTypeMaster.append(
              "master_degree_college_state_id",
              mastersCompleteData.master_degree_college_state_id
            );
          }

          if (mastersCompleteData.master_degree_college_district_id === 0) {
            formDataForTypeMaster.append(
              "master_college_degree_other_district_name",
              mastersCompleteData.master_college_degree_other_district_name
            );
          } else {
            formDataForTypeMaster.append(
              "master_degree_college_district_id",
              mastersCompleteData.master_degree_college_district_id
            );
          }

          if (mastersCompleteData.master_degree_university_id === 0) {
            formDataForTypeMaster.append(
              "master_degree_other_university_name",
              mastersCompleteData.master_degree_other_university_name
            );
          } else {
            formDataForTypeMaster.append(
              "master_degree_university_id",
              mastersCompleteData.master_degree_university_id
            );
          }

          if (mastersCompleteData.master_degree_college_id === 0) {
            formDataForTypeMaster.append(
              "master_degree_other_college_name",
              mastersCompleteData.master_degree_other_college_name
            );
          } else {
            formDataForTypeMaster.append(
              "master_degree_college_id",
              mastersCompleteData.master_degree_college_id
            );
          }

          formDataForTypeMaster.append(
            "do_you_have_academic_gap_in_master_degree",
            mastersCompleteData.do_you_have_academic_gap_in_master_degree
          );
          formDataForTypeMaster.append(
            "master_degree_number_of_years",
            mastersCompleteData.master_degree_number_of_years
          );
      
      
      
      
      
      

      
 
    } 

if(!degTypeError.value &&
!degTypeOtherError.value &&
!degStreamError.value &&
!degStreamOtherError.value && 
!degYOPError.value &&
!degreeMarksType.value &&
!cgpaDegError.value &&
!cgpaDegError.value &&
!perDegError.value &&
!perDegError.value &&
!degCollegeStateError.value &&
!degCollegeStateOtherError.value &&
!degCollegeDistrictError.value &&
!degCollegeUniversityError.value &&
!degCollegeOtherUniversityError.value &&
!degCollegeOtherUniversityError.value &&
!degCollegeError.value &&
!degOtherCollegeError.value &&
!degACCGAP.value &&
!degAcdError.value &&
!DegbackLogError.value &&  
  !degCollegeDistrictOtherError.value) {


    if (form.degree_type_id == 0) {
            formDataForTypeMaster.append("other_degree_type", degreeCompleteData.other_degree_type);
          } else {
            formDataForTypeMaster.append("degree_type_id", degreeCompleteData.degree_type_id);
          }
          if (degreeCompleteData.degree_stream_id == 0) {
            formDataForTypeMaster.append(
              "other_degree_stream",
              degreeCompleteData.degree_other_stream_name
            );
          } else {
            formDataForTypeMaster.append("degree_stream_id", degreeCompleteData.degree_stream_id);
          }

          formDataForTypeMaster.append(
            "degree_probable_year_of_passout",
            degreeCompleteData.degree_probable_year_of_passout
          );
          formDataForTypeMaster.append(
            "degree_university_registration_number",
            degreeCompleteData.degree_university_registration_number
          );

          if (degreeCompleteData.degree_college_state_id == 0) {
            formDataForTypeMaster.append(
              "degree_college_other_state_name",
              degreeCompleteData.degree_college_other_state_name
            );
          } else {
            formDataForTypeMaster.append(
              "degree_college_state_id",
              degreeCompleteData.degree_college_state_id
            );
          }

          if (degreeCompleteData.degree_college_district_id === 0) {
            formDataForTypeMaster.append(
              "degree_college_other_district_name",
              degreeCompleteData.degree_college_other_district_name
            );
          } else {
            formDataForTypeMaster.append(
              "degree_college_district_id",
              degreeCompleteData.degree_college_district_id
            );
          }

          if (degreeCompleteData.degree_university_id === 0) {
            formDataForTypeMaster.append(
              "degree_other_university_name",
              degreeCompleteData.degree_other_university_name
            );
          } else {
            formDataForTypeMaster.append("degree_university_id", degreeCompleteData.degree_university_id);
          }

          if (degreeCompleteData.degree_college_id === 0) {
            formDataForTypeMaster.append(
              "degree_other_college_name",
              degreeCompleteData.degree_other_college_name
            );
          } else {
            formDataForTypeMaster.append("degree_college_id", degreeCompleteData.degree_college_id);
          }

          formDataForTypeMaster.append("degree_mark_type", degreeCompleteData.degree_mark_type);
          formDataForTypeMaster.append(
            "degree_active_backlogs",
            degreeCompleteData.degree_active_backlogs
          );
          formDataForTypeMaster.append(
            "degree_mark_type_value",
            degreeCompleteData.degree_mark_type_value
          );
          formDataForTypeMaster.append(
            "do_you_have_academic_gap_in_degree",
            degreeCompleteData.do_you_have_academic_gap_in_degree
          );
          formDataForTypeMaster.append(
            "degree_number_of_years",
            degreeCompleteData.degree_number_of_years
          );
  console.log("poda poole-2");
}

    if (form.specialization === "diploma" &&!specializationError.value&&
!dipStreamError.value&&
!diplomaOtherstreamError.value&&
!diplomaYOPerror.value&&
!dipMarktypeError.value&&
!diploma_mark_type_value_CGPA_Error.value&&
!diploma_mark_type_value_CGPA_Error.value&&
!diploma_mark_type_value_P_Error.value&&
!diploma_mark_type_value_P_Error.value&&
!dipCollegeStateError.value&&
!dipOtherCollegeStateError.value&&
!diplomaCollegeDsiatictError.value&&
!diplomaOtherDistrictError.value&&
!diplomaBoardError.value&&
!diplomaOtherBoardError.value&&
!diplomaCollegeError.value&&
!diplomaOtherCollegeError.value&&
!diplomaYearGapErrorr.value&&
!diplomaNumberOfYearsError.value
    ) {
      if (form.specialization == "diploma"){
            if (diplomaCompleteData.diploma_stream_id == 0) {
              formDataForTypeMaster.append(
                "other_diploma_stream_name",
                diplomaCompleteData.other_diploma_stream_name
              );
            } else {
              formDataForTypeMaster.append("diploma_stream_id", diplomaCompleteData.diploma_stream_id);
            }

            formDataForTypeMaster.append(
              "diploma_probable_year_of_passout",
              diplomaCompleteData.diploma_probable_year_of_passout
            );
            formDataForTypeMaster.append(
              "diploma_university_registration_number",
              diplomaCompleteData.diploma_university_registration_number
            );
            formDataForTypeMaster.append("diploma_mark_type", diplomaCompleteData.diploma_mark_type);
            formDataForTypeMaster.append(
              "diploma_mark_type_value",
              diplomaCompleteData.diploma_mark_type_value
            );

            if (diplomaCompleteData.diploma_college_state_id === 0) {
              formDataForTypeMaster.append(
                "diploma_college_other_state_name",
                diplomaCompleteData.diploma_college_other_state_name
              );
            } else {
              formDataForTypeMaster.append(
                "diploma_college_state_id",
                diplomaCompleteData.diploma_college_state_id
              );
            }

            if (diplomaCompleteData.diploma_board_id === 0) {
              formDataForTypeMaster.append(
                "diploma_other_board_name",
                diplomaCompleteData.diploma_other_board_name
              );
            } else {
              formDataForTypeMaster.append("diploma_board_id", diplomaCompleteData.diploma_board_id);
            }

            if (diplomaCompleteData.diploma_college_id === 0) {
              formDataForTypeMaster.append(
                "diploma_other_college_name",
                diplomaCompleteData.diploma_other_college_name
              );
            } else {
              formDataForTypeMaster.append("diploma_college_id", diplomaCompleteData.diploma_college_id);
            }

            formDataForTypeMaster.append(
              "do_you_have_academic_gap_upto_diploma",
              diplomaCompleteData.do_you_have_academic_gap_upto_diploma
            );
            formDataForTypeMaster.append(
              "diploma_number_of_years",
              diplomaCompleteData.diploma_number_of_years
            );

            if (diplomaCompleteData.diploma_college_district_id === 0) {
              formDataForTypeMaster.append(
                "diploma_college_other_district_name",
                diplomaCompleteData.diploma_college_other_district_name
              );
            } else {
              formDataForTypeMaster.append(
                "diploma_college_district_id",
                diplomaCompleteData.diploma_college_district_id
              );
            }
          }
          const response = await academicDetails.patchStudentAcademicData(
            formDataForTypeMaster
          );
          console.log("res", response);

      
  console.log("poda poole-3");
 }
if(form.specialization === "iti" && !specializationError.value&&
!itiStreamError.value&&
!itiStreamOtherError.value&&
!itiYOPError.value&&
!itidegree.value&&
!cgpaITIError.value&&
!cgpaITIError.value&&
!perITIError.value&&
!perITIError.value&& 
!itiColgStateError.value&&
  !itiColgStateOtherError.value) {
  console.log("poda poole-4");
}

    if (form.specialization === "puc" && !specializationError.value&& !cgpaPUCError.value &&
!perPUCError.value &&
!pucYOPError.value &&
!pucAcdError.value &&
!pucYopNumberOfYears.value ) {
  console.log("poda poole-5");
}

    if (!cgpaSSLCError.value &&

      !perSSLCError.value &&
!sslcYOPError) {
 console.log("poda poole-m6");
}

console.log(formDataForTypeMaster);
       
  }

  // ==================
  
 if (form.highest_on_going_degree === 3) {
//     if (!mdegtypeError.value &&
// !mstreamError.value &&
// !myopError.value &&
// !masters_marktype_error.value &&
// !mcgpaError.value &&
// !mcgpaError.value &&
// !mpercentageError.value &&
// !mpercentageError.value &&
// !mColgStateError.value &&
// !mColgStateOtherError.value &&
// !mColgDistError.value &&
// !mColgDistOtherError.value &&
// !mUniverError.value &&
// !mUniverOtherError.value &&
// !mColgError.value &&
// !mColgOtherError.value &&
// !MastersAnyAcamdeciGapError.value &&
// !masterAcdYearGapError.value &&
// !MbackLogError.value  ) {
//       console.log("poda poole");
//     } 

if(!degTypeError.value &&
!degTypeOtherError.value &&
!degStreamError.value &&
!degStreamOtherError.value && 
!degYOPError.value &&
!degreeMarksType.value &&
!cgpaDegError.value &&
!cgpaDegError.value &&
!perDegError.value &&
!perDegError.value &&
!degCollegeStateError.value &&
!degCollegeStateOtherError.value &&
!degCollegeDistrictError.value &&
!degCollegeUniversityError.value &&
!degCollegeOtherUniversityError.value &&
!degCollegeOtherUniversityError.value &&
!degCollegeError.value &&
!degOtherCollegeError.value &&
!degACCGAP.value &&
!degAcdError.value &&
!DegbackLogError.value &&  
  !degCollegeDistrictOtherError.value) {
  console.log("poda poole-2");
}

    if (form.specialization === "diploma" &&!specializationError.value&&
!dipStreamError.value&&
!diplomaOtherstreamError.value&&
!diplomaYOPerror.value&&
!dipMarktypeError.value&&
!diploma_mark_type_value_CGPA_Error.value&&
!diploma_mark_type_value_CGPA_Error.value&&
!diploma_mark_type_value_P_Error.value&&
!diploma_mark_type_value_P_Error.value&&
!dipCollegeStateError.value&&
!dipOtherCollegeStateError.value&&
!diplomaCollegeDsiatictError.value&&
!diplomaOtherDistrictError.value&&
!diplomaBoardError.value&&
!diplomaOtherBoardError.value&&
!diplomaCollegeError.value&&
!diplomaOtherCollegeError.value&&
!diplomaYearGapErrorr.value&&
!diplomaNumberOfYearsError.value
    ) {
  console.log("poda poole-3");
 }
if(form.specialization === "iti" && !specializationError.value&&
!itiStreamError.value&&
!itiStreamOtherError.value&&
!itiYOPError.value&&
!itidegree.value&&
!cgpaITIError.value&&
!cgpaITIError.value&&
!perITIError.value&&
!perITIError.value&& 
!itiColgStateError.value&&
  !itiColgStateOtherError.value) {
  console.log("poda poole-4");
}

    if (form.specialization === "puc" && !specializationError.value&& !cgpaPUCError.value &&
!perPUCError.value &&
!pucYOPError.value &&
!pucAcdError.value &&
!pucYopNumberOfYears.value ) {
  console.log("poda poole-5");
}

    if (!cgpaSSLCError.value &&

      !perSSLCError.value &&
!sslcYOPError
) {
 console.log("poda poole-6");
}

       
  }
console.log("tenthCompleteData",tenthCompleteData);
  




};
</script>

<style lang="scss" scoped></style>
