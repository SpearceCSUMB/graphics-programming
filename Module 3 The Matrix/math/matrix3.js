/*
 * An object representing a 3x3 matrix
 */

var Matrix3 = function() {

	if (!(this instanceof Matrix3)) {
		alert("Matrix3 constructor must be called with the new operator");
	}

	// Stores a matrix in a flat array - left to right, top to bottom.
	// This format will be similar to what we'll eventually need to provide the WebGL API
	this.elements = new Float32Array(9);

	// todo
	// "this.elements" should be initialized with values equal to the identity matrix
	for (var i = 0; i < 9; i++){
		this.elements[i] = (i % 3 == Math.floor(i / 3)) ? 1 : 0;
	}

	// -------------------------------------------------------------------------
	this.clone = function() {
		// todo
		// create a new Matrix3 instance that is an exact copy of 'this' one and return it
		newMat = new Matrix3().set(this.elements[0],this.elements[1],this.elements[2],
								   this.elements[3],this.elements[4],this.elements[5],
			                       this.elements[6],this.elements[7],this.elements[8]);
		return  newMat/* should be a new Matrix instance*/;
	};

	// -------------------------------------------------------------------------
	this.copy = function(other) {
		// todo

		// copy all of the elements of other into the elements of 'this' matrix
		for (var i = 0; i < 9; i++) {
			this.elements[i] = other.elements[i];
		}
		return this;
	};

	// -------------------------------------------------------------------------
	this.set = function (e11, e12, e13, e21, e22, e23, e31, e32, e33) {
		// todo
		// given the 9 elements passed in as argument e-row#col#, use
    	// them as the values to set on 'this' matrix.
		// Order is left to right, top to bottom.
		this.elements[0] = e11; this.elements[1] = e12; this.elements[2] = e13;
		this.elements[3] = e21; this.elements[4] = e22; this.elements[5] = e23;
		this.elements[6] = e31; this.elements[7] = e32; this.elements[8] = e33;
		return this;
	};

	// -------------------------------------------------------------------------
	this.getElement = function(row, col) {
		// todo
		// use the row and col to get the proper index into the 1d element array and return it
		if (row == 0) {
			index = col;
		} else if (row == 1) {
			index = col + 3;
		} else {
			index = col + 6;
		}
		return this.elements[index];
	};

	// -------------------------------------------------------------------------
	this.setIdentity = function() {
		// todo
		// reset every element in 'this' matrix to make it the identity matrix
		for (var i = 0; i < 9; ++i) {
			this.elements[i] = (i % 3 == Math.floor(i / 3)) ? 1 : 0;
		}
		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationX = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the X axis
		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationY = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the Y axis
		return this;
	};


	// -------------------------------------------------------------------------
	this.setRotationZ = function(angle) {
		// not required yet, attempt to implement if finished early
		// create a rotation matrix that rotates around the Z axis
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyScalar = function(s) {
		// todo
		for (var i = 0; i < 9; i++) {
			this.elements[i] = this.elements[i]*s;
		}
		// multiply every element in 'this' matrix by the scalar argument s
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyRightSide = function(omr) { //omr = otherMatrixOnRight renamed for shorter steps below. 
		// todo
		// multiply 'this' matrix (on the left) by otherMatrixOnRight (on the right)
		// The below is definitely not optimized but it gets the job done...
		var a1 = ((this.elements[0] * omr.elements[0]) + (this.elements[1] * omr.elements[3]) + (this.elements[2] * omr.elements[6]));
		var a2 = ((this.elements[0] * omr.elements[1]) + (this.elements[1] * omr.elements[4]) + (this.elements[2] * omr.elements[7]));
		var a3 = ((this.elements[0] * omr.elements[2]) + (this.elements[1] * omr.elements[5]) + (this.elements[2] * omr.elements[8]));
		var b1 = ((this.elements[3] * omr.elements[0]) + (this.elements[4] * omr.elements[3]) + (this.elements[5] * omr.elements[6]));
		var b2 = ((this.elements[3] * omr.elements[1]) + (this.elements[4] * omr.elements[4]) + (this.elements[5] * omr.elements[7]));
		var b3 = ((this.elements[3] * omr.elements[2]) + (this.elements[4] * omr.elements[5]) + (this.elements[5] * omr.elements[8]));
		var c1 = ((this.elements[6] * omr.elements[0]) + (this.elements[7] * omr.elements[3]) + (this.elements[8] * omr.elements[6]));
		var c2 = ((this.elements[6] * omr.elements[1]) + (this.elements[7] * omr.elements[4]) + (this.elements[8] * omr.elements[7]));
		var c3 = ((this.elements[6] * omr.elements[2]) + (this.elements[7] * omr.elements[5]) + (this.elements[8] * omr.elements[8]));
		// the results should be applied to the elements on 'this' matrix
		this.elements[0] = a1; this.elements[1] = a2; this.elements[2] = a3;
		this.elements[3] = b1; this.elements[4] = b2; this.elements[5] = b3;
		this.elements[6] = c1; this.elements[7] = c2; this.elements[8] = c3;
		return this;
	};

	// -------------------------------------------------------------------------
	this.determinant = function() {
		// todo
		// compute and return the determinant for 'this' matrix
		/*
		*   0   1   2 
		*   3   4   5 
		*   6   7   8 
		*/

		var alpha = this.elements[0]*((this.elements[4]*this.elements[8]) - (this.elements[5]*this.elements[7]));
		var beta = this.elements[1]*((this.elements[3]*this.elements[8]) - (this.elements[5]*this.elements[6]));
		var charlie = this.elements[2]*((this.elements[3]*this.elements[7]) - (this.elements[4]*this.elements[6])); 
		var det = Math.abs(alpha - beta + charlie);
		return det; // should be the determinant
	};

	// -------------------------------------------------------------------------
	this.transpose = function() {
		// todo
		var e = this.elements;
		var tmatrix = this.clone();
		var te = tmatrix.elements;
		e[0] = te[0];
		e[3] = te[1];
		e[6] = te[2];

		e[1] = te[3];
		e[4] = te[4];
		e[7] = te[5];

		e[2] = te[6];
		e[5] = te[7];
		e[8] = te[8];

		return this;
	};

	this.minorDeterminant = function(r, c)
	{
		var minorMat = new Float32Array(4);
		var position = 0;
		for(var row=0;row<3;row++)
		{
			if(r==row)
				continue;
			for(var col=0;col<3;col++)
			{
				if(c==col)
					continue;
				minorMat[position] = this.elements[(row*3) + col];
				position++;
			}
		}
		var diagnol1 = minorMat[0] * minorMat[3];
		var diagnol2 = minorMat[1] * minorMat[2];
		var det = diagnol1 - diagnol2;
		return det;
	};

	// -------------------------------------------------------------------------
	this.inverse = function() {
		// modify 'this' matrix so that it becomes its inverse
		var det = this.determinant();
		// No inverse
		if(det==0)
			return this;
		var tMatrix = this.clone().transpose();
		var adjMatrix = new Matrix3;
		for(var row=0;row<3;row++)
		{
			for(var col=0;col<3;col++)
			{
				var minorDet = tMatrix.minorDeterminant(row,col);
				adjMatrix.elements[(row*3)+col] = minorDet;
			}
		}
		for(var i=0;i<9;i++)
		{
			if(i % 2)
				adjMatrix.elements[i] = adjMatrix.elements[i] * -1;
		}
		var inverseMat = new Matrix3;
		for(var i=0;i<9;i++)
		{
			inverseMat.elements[i] = adjMatrix.elements[i] / det;
		}	

		this.copy(inverseMat);
		return this;
	};

	// -------------------------------------------------------------------------
	this.log = function() {
		
		console.log('[ '+
      '\n ' + e[0]  + ', ' + e[1]  + ', ' + e[2]  +
      '\n ' + e[4]  + ', ' + e[5]  + ', ' + e[6]  +
      '\n ' + e[8]  + ', ' + e[9]  + ', ' + e[10] +
      '\n ' + e[12] + ', ' + e[13] + ', ' + e[14] +
      '\n]'
		);

		return this;
	};
};
