class RollController < ApplicationController
  def roll
    @buttons = Button.all
  end

  def go
    arr = []
    params[:n].to_i.times do |x|
      arr << (rand(params[:d].to_i) + 1)
    end
    @res = "#{params[:n].to_i}d#{params[:d]}+#{params[:m].to_i}:<br>"
    @res += "#{arr.join(" ")}"
    sum = arr.inject{|sum,x| sum + x }
    @res += " = #{sum}" if params[:n].to_i > 1
    @res += "+#{params[:m].to_i} = #{params[:m].to_i + sum}" if params[:m].to_i > 0
  end
end
