/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x, y, z) {
  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the new operator");
  }

  // todo - make sure to set a default value in case x, y, or z is not passed in
  if (this.x == null && this.y == null && this.z == null) {
    this.x = 0; this.y = 0; this.z = 0;
  }

  

  this.set = function(x, y, z) {
    // todo set 'this' object's values to those from x, y, and z
    this.x = x; this.y = y; this.z = z;
    return this;
  }

  this.clone = function() {
    return new Vector3(this.x, this.y, this.z);
  };

  this.copy = function(other) {
    // copy the values from other into 'this'
    this.x = other.x; this.y = other.y; this.z = other.z;
    return this;
  }

  this.add = function(v) {
    // todo - add v to 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    this.z = this.z + v.z;
    return this;
  };

  this.subtract = function(v) {
    // todo - subtract v from 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    this.z = this.z - v.z;
    return this;
  };

  this.negate = function() {
    // multiply 'this' vector by -1
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x * -1;
    this.y = this.y * -1;
    this.z = this.z * -1;
    return this;
  };

  this.multiplyScalar = function(scalar) {
    // multiply 'this' vector by "scalar"
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = this.x*scalar;
    this.y = this.y*scalar;
    this.z = this.z*scalar;
    return this;
  };

  this.length = function() {
    // todo - return the magnitude (A.K.A. length) of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
    var mag = 0;
    mag = Math.abs(Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2)));
    return mag;
  };

  this.lengthSqr = function() {
    // todo - return the squared magnitude of this vector ||v||^2
    // This should NOT change the values of this.x, this.y, and this.z
    var mag = 0;
    mag = Math.abs(Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2)));
    mag = Math.pow(mag,2);
    return mag;
  };

  this.normalized = function() {
    // todo - return a new vector instance that is a normalized clone of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
    normal = new Vector3(this.x, this.y, this.z);
    var mag = normal.length();
    normal.x = normal.x / mag;
    normal.y = normal.y / mag;
    normal.z = normal.z / mag;
    return normal; // Should return a new vector that is not this
  };

  this.normalize = function() {
    // todo - Change the components of this vector so that its magnitude will equal 1.
    // This SHOULD change the values of this.x, this.y, and this.z
    var mag = 0;
    mag = Math.abs(Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2)));
    this.x = this.x / mag;
    this.y = this.y / mag;
    this.z = this.z / mag;
    return this;
  };

  this.dot = function(other) {
    // todo - return the dot product between this vector and "other"
    // This should NOT change the values of this.x, this.y, and this.z
    var dp = 0;
    dp = (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
    return dp;
  };
};
