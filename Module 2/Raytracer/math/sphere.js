/*
 * Authors: Kevin Bentley, Samuel Pearce
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

var Sphere = function(center, radius,color, reflectivity) {
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  if (!(center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(radius) != 'number')) {
    console.error("The radius must be a Number");
  }

  this.center = center;
  this.radius = radius;
  this.color = color || new Vector3(1, 1, 1);
  this.reflectivity = (reflectivity != undefined) ? reflectivity: 0;

  if (center === undefined) {
    this.center = new Vector3(0, 0, 0);
  }

  if (radius === undefined) {
    this.radius = 1;
  }


  // todo - make sure center and radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1

  this.raycast = function(ray) {
    
    //Quick test for inside sphere
    var raySphereDistancSqr = ray.origin.minus(this.center).lengthSqr();
    if(raySphereDistancSqr < (this.radius*this.radius))
    {
      var result = {
        hit: false
      };
      return result;
    }

    var a = ray.direction.dot(ray.direction);
    var b = ray.direction.times(2).dot(ray.origin.minus(this.center));
    var c = ray.origin.minus(this.center).dot((ray.origin.minus(this.center))) - (this.radius * this.radius);

    var alpha1 = 0;
    var alpha2 = 0;
    var discriminant = ((b*b) - (4*a*c));
    
    if(discriminant < 0)
    {
      //No intersections
      var result = {
        hit: false
      };
      return result;
    }
    var numerator = (-b - Math.sqrt(discriminant));
    var denominator = (2*a);
    alpha1 = numerator / denominator;
    var intersectionPoint = ray.origin.plus((ray.direction.times(alpha1)));
    normal = intersectionPoint.minus(this.center);
    normal.normalize();

    //Tangent intersection
    if (discriminant==0)
    {      
      numerator = -b;
      denominator = (2*a);
      var alpha = numerator / denominator;
      if(alpha < 0)
      {
        //Negative intersections
        var result = {
        hit: false
        }
        return result;
      };
      intersectionPoint = ray.origin.plus((ray.direction.times(alpha)));
      normal = intersectionPoint.minus(this.center);
      normal.normalize();
      var result = {
        hit: true,
        point: intersectionPoint,
        normal: normal,
        distance: alpha * alpha
      };
      return result;
    }
    if (discriminant > 0) {
      //2 Intersections
      discriminant = (Math.pow(b, 2) - (4*a*c));
      numerator = (-b + Math.sqrt(discriminant));
      denominator = (2*a);
      alpha2 = numerator / denominator;
      var alpha = alpha2;
      if(alpha1 < alpha2)
      {
        discriminant = (Math.pow(b, 2) - (4*a*c));
        numerator = (-b - Math.sqrt(discriminant));
        denominator = (2*a);
        alpha = numerator / denominator;        
      }
      if(alpha < 0)
      {
        //Negative intersections
        var result = {
        hit: false
      };
      return result;
      }
      intersectionPoint = ray.origin.plus((ray.direction.times(alpha)));
      normal = intersectionPoint.minus(this.center);
      normal.normalize();
      var result = {
        hit: true,
        point: intersectionPoint,
        normal: normal,
        distance: alpha * alpha
      };
      return result;
      
      
    }else{
      //No intersections
      var result = {
        hit: false
      };
      return result;
    }
    return result;
  }
};
